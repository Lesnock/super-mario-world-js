import loadJson from '../Loaders/JsonLoader'
import LayerManager from '../Layers/LayerManager';
import loadSpriteSheet from '../Loaders/SpriteSheetLoader';

export default class Level
{
    constructor (levelSpec)
    {
        this.spec = levelSpec

        this.layers = new LayerManager()
    }
}