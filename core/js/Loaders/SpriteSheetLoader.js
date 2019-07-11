import loadJSON from "./JsonLoader";
import loadImage from "./ImageLoader";
import SpriteSheet from "../SpriteSheet/SpriteSheet";
import Assets from "../Assets";

export default async function loadSpriteSheet (name)
{
    if (Assets.sheets.has(name))
        return Assets.sheets.get(name)

    const spriteSheetSpec   = await loadJSON(`core/spritesheets/${name}.json`)
    const image             = await loadImage(`core/gfx/spritesheets/${spriteSheetSpec.image}`)
    
    const spriteSheet = new SpriteSheet(image)

    if (spriteSheetSpec.tiles)
        defineTiles(spriteSheetSpec.tiles, spriteSheet)

    if (spriteSheetSpec.sprites)
        defineSprites(spriteSheetSpec.sprites, spriteSheet)

    if (spriteSheetSpec.animations)
        defineAnimations(spriteSheetSpec.animations, spriteSheet)

    Assets.sheets.set(name, spriteSheet)

    return spriteSheet
}

//Tiles
function defineTiles (tiles, spriteSheet)
{
    tiles.forEach(tile => {
        const [x, y, width, height] = tile.index
        spriteSheet.defineTile(tile.id, x, y, width, height)
    });

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