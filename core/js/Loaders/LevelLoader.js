import Level from "../Level/Level";
import loadJSON from "./JsonLoader";
import loadSpriteSheet from "./SpriteSheetLoader";
import BackgroundLayer from "../Layers/BackgroundLayer";
import SpriteLayer from "../Layers/SpriteLayer";

export default async function loadLevel (name)
{
    const levelSpec =   await loadJSON(`core/levels/${name}.json`)
    const spriteSheet = await loadSpriteSheet(levelSpec.spriteSheet)

    const level = new Level()

    //Create and add layers
    levelSpec.layers.forEach(layerSpec => {
        const layer = createBackgroundLayer(layerSpec.tiles, spriteSheet)
        level.layers.addLayer(layer)
    })

    const imports = []

    levelSpec.gameObjects.forEach((name) => {
        imports.push = import(`../GameObjects/${name}.js`)
    })

    // Promise.all(imports)
    // .then((module1) => {

    // })
}

function createBackgroundLayer (tiles, spriteSheet)
{
    return new BackgroundLayer(tiles, spriteSheet)
}

function createSpriteLayer (objects)
{
    return new SpriteLayer (objects)
}