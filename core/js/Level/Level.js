import LayerManager from '../Layers/LayerManager';

export default class Level
{
    constructor ()
    {
        this.layers = new LayerManager()
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