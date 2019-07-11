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

    render (g)
    {
        this.layers.forEach(layer => {
            layer.render(g)
        })
    }
}