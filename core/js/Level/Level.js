import LayerManager from '../Layers/LayerManager.js';
import TileCollider from '../Collision/TileCollider.js';

export default class Level
{
    constructor ()
    {
        this.spec = {}
        this.layers = new LayerManager()
    }

    setCollisionGrid (tileGrid)
    {
        this.tileCollider = new TileCollider(tileGrid)
    }

    update (dt)
    {
        this.layers.update(dt)
    }

    render (g)
    {
        this.layers.render(g)
    }
}