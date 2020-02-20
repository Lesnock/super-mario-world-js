import Container from '../Container.js'

export default class Tile
{
    constructor (buffer, x, y, width = Tile.defaultWidth, height = Tile.defaultHeight)
    {
        this.buffer = buffer
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.collider = null
    }

    render (g, indexX, indexY)
    {
        const { camera } = Container.modules()

        g.drawImage(
            this.buffer, 
            indexX * this.width - camera.position.x, 
            indexY * this.height - camera.position.y
        )
    }

    async setCollider (name)
    {
        if (name === 'none')
            return null

        const module = await import(`../Collision/Colliders/${name}.js`)
        this.collider = new module.default(this)
    }
}

Tile.defaultWidth = 16
Tile.defaultHeight = 16
Tile.scale = 1