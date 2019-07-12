export default class Tile
{
    constructor (buffer, x, y, width = Tile.defaultWidth, height = Tile.defaultHeight)
    {
        this.buffer = buffer
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    render (g, indexX, indexY)
    {
        g.drawImage(this.buffer, indexX * this.width, indexY * this.height)
    }
}

Tile.defaultWidth = 16
Tile.defaultHeight = 16
Tile.scale = 1