export default class LayerManager
{
    constructor ()
    {
        this.layers = []
    }

    addLayer (layer)
    {
        this.layers.push(layer)
    }

    update (dt)
    {
        this.layers.forEach(layer => {
            layer.update(dt)
        })
    }

    render (g)
    {
        this.layers.forEach(layer => {
            layer.render(g)
        })
    }
}