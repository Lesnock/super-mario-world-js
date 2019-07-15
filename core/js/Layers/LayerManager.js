export default class LayerManager
{
    constructor ()
    {
        this.tiles = []
        this.sprites = []
    }

    addTileLayer (layer)
    {
        this.tiles.push(layer)
    }

    addSpriteLayer (layer)
    {
        this.sprites.push(layer)
    }

    update (dt)
    {
        this.tiles.forEach(layer => {
            layer.update(dt)
        })

        this.sprites.forEach(layer => {
            layer.update(dt)
        })
    }

    render (g)
    {
        this.tiles.forEach(layer => {
            layer.render(g)
        })

        this.sprites.forEach(layer => {
            layer.render(g)
        })
    }
}