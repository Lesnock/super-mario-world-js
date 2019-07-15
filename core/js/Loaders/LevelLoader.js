import Level from "../Level/Level";
import loadJSON from "./JsonLoader";
import Matrix from "../Math/Matrix";
import SpriteLayer from "../Layers/SpriteLayer";
import loadSpriteSheet from "./SpriteSheetLoader";
import BackgroundLayer from "../Layers/BackgroundLayer";

//Load a level
//Load spritesheet, create the layers (background and sprite)
export default async function loadLevel (name)
{
    const levelSpec =   await loadJSON(`core/levels/${name}.json`)

    const spriteSheet = await loadSpriteSheet(levelSpec.spriteSheet)

    const level = new Level()

    //Create and add layers
    levelSpec.layers.forEach(layerSpec => {
        const layer = createBackgroundLayer(layerSpec.tiles, levelSpec.columns, levelSpec.rows, spriteSheet)
        level.layers.addLayer(layer)
    })

    const spriteLayer = await createSpriteLayer(levelSpec.gameObjects)
    level.layers.addLayer(spriteLayer)

    return level
}

function createBackgroundLayer (tiles, columns, rows, spriteSheet)
{
    const grid = new Matrix()

    for (let x = 0; x < columns; x++) {

        for (let y = 0; y < rows; y++) {

            const tile = tiles[x + (y * columns)]

            grid.set(x, y, spriteSheet.tiles.get(tile))
            
        }
    }

    return new BackgroundLayer(grid, columns, rows)
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

            objects.push(instance)
        })
    }

    return new SpriteLayer(objects)
}