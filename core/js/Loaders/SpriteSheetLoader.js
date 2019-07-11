import loadJSON from "./JsonLoader";
import loadImage from "./ImageLoader";
import SpriteSheet from "../SpriteSheet/SpriteSheet";

export default async function loadSpriteSheet (name)
{
    const spriteSheetSpec   = await loadJSON(`core/spritesheets/${name}.json`)
    const image             = await loadImage(`core/gfx/spritesheets/${spriteSheetSpec.image}`)

    const spriteSheet = new SpriteSheet(image)

    defineTiles(spriteSheetSpec, spriteSheet)
    defineSprites(spriteSheetSpec, spriteSheet)

    return spriteSheet
}

//Tiles
function defineTiles (spriteSheetSpec, spritesheet)
{
    if (spriteSheetSpec.tiles) {

        const tiles = spriteSheetSpec.tiles

        //Define tiles
        for (const id in tiles) {
            const [x, y, width, height] = tiles[id].index
            spritesheet.defineTile(tiles[id].name, x, y, width, height)
        }
    }
}

//Sprites
function defineSprites (spriteSheetSpec, spritesheet)
{

}