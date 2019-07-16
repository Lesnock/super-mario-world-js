import Level from "../Level/Level";
import loadJSON from "./JsonLoader";
import Matrix from "../Math/Matrix";
import TileLayer from "../Layers/TileLayer";
import SpriteLayer from "../Layers/SpriteLayer";
import loadSpriteSheet from "./SpriteSheetLoader";
import TileCollider from "../Collision/TileCollider";

//Load a level
//Load spritesheet, create the layers (background and sprite)
export default async function loadLevel (name)
{
    const levelSpec =   await loadJSON(`core/levels/${name}.json`)

    const spriteSheet = await loadSpriteSheet(levelSpec.spriteSheet)

    const level = new Level()

    //Tile layers
    levelSpec.layers.forEach(layerSpec => {
        const layer = createTileLayer(layerSpec.tiles, levelSpec.columns, levelSpec.rows, spriteSheet)
        level.layers.addTileLayer(layer)
    })

    createTileCollider(levelSpec.layers, levelSpec.columns, levelSpec.rows, spriteSheet)

    //Sprite Layers
    const spriteLayer = await createSpriteLayer(levelSpec.gameObjects)
    level.layers.addSpriteLayer(spriteLayer)

    return level
}

function createTileLayer (tiles, columns, rows, spriteSheet)
{
    const grid = new Matrix()

    for (let x = 0; x < columns; x++) {

        for (let y = 0; y < rows; y++) {

            const tile = tiles[x + (y * columns)]

            grid.set(x, y, spriteSheet.tiles.get(tile))
            
        }
    }

    return new TileLayer(grid, columns, rows)
}

function createSpriteLayer (gameObjects)
{
    const objects = []

    for (const name in gameObjects) {

        const positions = gameObjects[name]

        positions.forEach(async position => {
            const module = await import(`../GameObjects/${name}.js`)
            const [x, y] = position

            const instance = new module.default()
            instance.position.x = x
            instance.position.y = y

            instance.components.forEach(component => {
                instance[component.name] = component
            })

            instance.config()

            objects.push(instance)
        })
    }

    return new SpriteLayer(objects)
}

function createTileCollider (tileLayers, columns, rows, spriteSheet)
{
    const mergedTiles = mergeTileLayers(tileLayers)
    const collisionGrid = createCollisionGrid(mergedTiles, columns, rows, spriteSheet)

    return new TileCollider(collisionGrid)
}

function mergeTileLayers (tileLayers)
{
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

function createCollisionGrid (tiles, columns, rows, spriteSheet)
{
    const collisionGrid = new Matrix()

    for (let x = 0; x < columns; x++) {

        for (let y = 0; y < rows; y++) {

            const tile = tiles[x + (y * columns)]
            collisionGrid.set(x, y, spriteSheet.tiles.get(tile))

        }
    }

    return collisionGrid
}