import Level from "../Level/Level.js";
import loadJSON from "./JsonLoader.js";
import Matrix from "../Math/Matrix.js";
import Container from '../Container.js';
import loadImage from "./ImageLoader.js";
import TileLayer from "../Layers/TileLayer.js";
import SpriteLayer from "../Layers/SpriteLayer.js";
import loadSpriteSheet from "./SpriteSheetLoader.js";
import TileCollider from "../Collision/TileCollider.js";
import BackgroundLayer from "../Layers/BackgroundLayer.js";

//Load a level
//Load spritesheet, create the layers (background and sprite)
export default async function loadLevel(name) 
{
    const level = new Level()

    const levelSpec = await loadJSON(`core/levels/${name}.json`)

    // Background
    const backgroundImage = await loadImage(`core/gfx/backgrounds/${levelSpec.backgroundImage}`)
    
    const backgroundLayer = new BackgroundLayer(levelSpec.backgroundColor, backgroundImage, {
        rows: levelSpec.rows,
        columns: levelSpec.columns,
    })

    level.layers.addBackgroundLayer(backgroundLayer)

    // Load Sprite Sheet
    const spriteSheet = await loadSpriteSheet(levelSpec.spriteSheet)

    // Create tile layers
    levelSpec.layers.forEach(layerSpec => {
        const layer = createTileLayer(layerSpec.tiles, levelSpec.columns, levelSpec.rows, spriteSheet)
        level.layers.addTileLayer(layer)
    })

    createTileCollider(levelSpec.layers, levelSpec.columns, levelSpec.rows, spriteSheet)

    //Sprite Layers
    const spriteLayer = await createSpriteLayer(levelSpec.gameObjects)
    level.layers.addSpriteLayer(spriteLayer)

    Container.bind({ level })

    return level
}

function createTileLayer(tiles, columns, rows, spriteSheet) {
    const grid = new Matrix()

    for (let x = 0; x < columns; x++) {

        for (let y = 0; y < rows; y++) {

            const tile = tiles[x + (y * columns)]

            grid.set(x, y, spriteSheet.tiles.get(tile))

        }
    }

    return new TileLayer(grid, columns, rows)
}

function createSpriteLayer(gameObjects) {
    const objects = []

    for (const name in gameObjects) {

        const positions = gameObjects[name]

        positions.forEach(async position => {
            const module = await import(`../GameObjects/${name}.js`)
            const [x, y] = position

            const instance = await module.default.create()
            instance.position.x = x
            instance.position.y = y

            objects.push(instance)
        })
    }

    return new SpriteLayer(objects)
}

function createTileCollider(tileLayers, columns, rows, spriteSheet) {
    const mergedTiles = mergeTileLayers(tileLayers)
    const collisionGrid = createCollisionGrid(mergedTiles, columns, rows, spriteSheet)

    return new TileCollider(collisionGrid)
}

function mergeTileLayers(tileLayers) {
    const mergedTiles = []

    tileLayers.forEach(layer => {
        layer.tiles.forEach((tile, index) => {
            if (tile !== "") {
                mergedTiles[index] = tile
            }
        })
    })

    return mergedTiles
}

function createCollisionGrid(tiles, columns, rows, spriteSheet) {
    const collisionGrid = new Matrix()

    for (let x = 0; x < columns; x++) {

        for (let y = 0; y < rows; y++) {

            const tile = tiles[x + (y * columns)]
            collisionGrid.set(x, y, spriteSheet.tiles.get(tile))

        }
    }

    return collisionGrid
}