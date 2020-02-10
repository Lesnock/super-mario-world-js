import loadJSON from "./JsonLoader.js";
import loadImage from "./ImageLoader.js";
import SpriteSheet from "../SpriteSheet/SpriteSheet.js";
import Assets from "../Assets.js";

export default async function loadSpriteSheet (name)
{
    if (Assets.sheets.has(name))
        return Assets.sheets.get(name)

    const spriteSheetSpec   = await loadJSON(`core/spritesheets/${name}.json`)
    const image             = await loadImage(`core/gfx/spritesheets/${spriteSheetSpec.image}`)
    
    const spriteSheet = new SpriteSheet(image)

    if (spriteSheetSpec.tiles)
        await defineTiles(spriteSheetSpec.tiles, spriteSheet)

    if (spriteSheetSpec.sprites)
        await defineSprites(spriteSheetSpec.sprites, spriteSheet)

    if (spriteSheetSpec.animations)
        await defineAnimations(spriteSheetSpec.animations, spriteSheet)

    Assets.sheets.set(name, spriteSheet)

    return spriteSheet
}

//Tiles
async function defineTiles (tiles, spriteSheet)
{
    for (const tileID in tiles) {

        const tile = tiles[tileID]
        const [x, y, width, height] = tile.index
        const collider = tile.collider
        await spriteSheet.defineTile(tile.id, x, y, width, height, collider)
        
    }

    return spriteSheet
}

//Sprites
function defineSprites (sprites, spriteSheet)
{
    //Define tiles
    for (const name in sprites) {
        const [x, y, width, height] = sprites[name]
        spriteSheet.defineSprite(name, x, y, width, height)
    }
}

//Animations
function defineAnimations (animations, spriteSheet)
{
    for (const name in animations) {        
        const frames = animations[name].frames
        const loop = animations[name].loop
        spriteSheet.defineAnimation(name, frames, loop)
    }    
}