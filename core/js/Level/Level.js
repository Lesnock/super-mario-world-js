import LayerManager from '../Layers/LayerManager';
import TileCollider from '../Collision/TileCollider';

export default class Level
{
    constructor ()
    {
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