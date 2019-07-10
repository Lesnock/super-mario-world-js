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
}

Tile.defaultWidth = 64
Tile.defaultHeight = 64