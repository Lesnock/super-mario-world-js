import loadJson from '../Loaders/JsonLoader'
import SpriteSheet from '../SpriteSheet/SpriteSheet'
import loadSpriteSheet from '../Loaders/SpriteSheetLoader';

export default class Level
{
    constructor (src)
    {
        this.src = src
    }

    async load ()
    {
        const levelSpec = await loadJson('core/levels/1.json')

        this.name = levelSpec.name
        this.time = levelSpec.time
        this.columns = levelSpec.columns

        this.spritesheet = await loadSpriteSheet(levelSpec.spritesheet)

        return this

        // levelSpec.layers.forEach(layer => {
            
        // });
    }
}