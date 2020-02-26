export default class LayerManager
{
    constructor ()
    {
        this.tiles = []
        this.sprites = []
        this.collisions = []
        this.backgrounds = []
    }

    addTileLayer (layer)
    {
        this.tiles.push(layer)
    }

    addSpriteLayer (layer)
    {
        this.sprites.push(layer)
    }

    addCollisionLayer (layer)
    {
        this.collisions.push(layer)
    }

    addBackgroundLayer(layer) {
        this.backgrounds.push(layer)
    }

    update (dt)
    {
        this.tiles.forEach(layer => {
            layer.update(dt)
        })

        this.sprites.forEach(layer => {
            layer.update(dt)
        })

        this.backgrounds.forEach(layer => {
            layer.update(dt)
        })
    }

    render (g)
    {
        this.backgrounds.forEach(layer => {
            layer.render(g)
        })

        this.tiles.forEach(layer => {
            layer.render(g)
        })

        this.sprites.forEach(layer => {
            layer.render(g)
        })
    }
}