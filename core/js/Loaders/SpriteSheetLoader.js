import loadJSON from "./JsonLoader";
import loadImage from "./ImageLoader";
import SpriteSheet from "../SpriteSheet/SpriteSheet";

var spriteSheetPath = 'core/sprites/'
var imagePath = 'core/gfx/spritesheets/'

export default async function loadSpriteSheet (name)
{
    const spriteSheetSpec = await loadJSON(spriteSheetPath + name + '.json')
    
    const image = await loadImage(imagePath + spriteSheetSpec.image)

    const spritesheet = new SpriteSheet(image)

    defineTiles(spriteSheetSpec, spritesheet)

    return spritesheet
}

function defineTiles (spriteSheetSpec, spritesheet)
{
    if (spriteSheetSpec.tiles) {
        spriteSheetSpec.tiles.forEach(tile => {
            spritesheet.defineTile(tile.name, tile.index[0], tile.index[1], tile.index[2], tile.index[3])
        });
    }
}