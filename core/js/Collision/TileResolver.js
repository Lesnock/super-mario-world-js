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

        if (tile) {
            return {tile}
        }
    }

    getByPosition (posX, posY)
    {
        return this.getByIndex(this.toIndex(posX), this.toIndex(posY))
    }
}