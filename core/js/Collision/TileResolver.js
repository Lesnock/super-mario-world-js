import Tile from "../SpriteSheet/Tile";

export default class TileResolver
{
    constructor (tileGrid, tileWidth = Tile.defaultWidth, tileHeight = Tile.defaultHeight)
    {
        this.grid = tileGrid
        this.tileWidth = tileWidth
        this.tileHeight = tileHeight
    }

    toIndex (posX, posY)
    {
        const x = Math.floor(posX / this.tileWidth)
        const y = Math.floor(posY / this.tileHeight)

        return {x, y}
    }

    getByIndex (indexX, indexY)
    {
        const tile = this.grid.get(indexX, indexY)

        const x1 = indexX * this.tileWidth
        const x2 = x1 + this.tileWidth

        const y1 = indexY * this.tileHeight
        const y2 = y1 + this.tileWidth

        if (tile) {
            return {
                tile, x1, x2, y1, y2
            }
        }
    }

    getByPosition (posX, posY)
    {
        const index = this.toIndex(posX, posY)
        return this.getByIndex(index.x, index.y)
    }
}