import Tile from "../SpriteSheet/Tile.js";

export default class TileResolver {

    constructor(tileGrid, tileWidth = Tile.defaultWidth, tileHeight = Tile.defaultHeight) {
        this.grid = tileGrid
        this.tileWidth = tileWidth
        this.tileHeight = tileHeight
    }

    toIndex(pos, tileSize = this.tileWidth) {
        return Math.floor(pos / tileSize)
    }

    toIndexRange(pos1, pos2, tileSize = this.tileWidth) {
        const posMax = Math.ceil(pos2 / tileSize) * tileSize
        const range = []
        let position = pos1

        do {
            range.push(this.toIndex(position))
            position += tileSize
        } while (position < posMax)

        // console.log(range)

        return range
    }

    getByIndex(indexX, indexY) {
        const tile = this.grid.get(indexX, indexY)

        const x1 = indexX * this.tileWidth
        const x2 = x1 + this.tileWidth

        const y1 = indexY * this.tileHeight
        const y2 = y1 + this.tileHeight

        if (tile) {
            return {
                tile, x1, x2, y1, y2
            }
        }
    }

    getByPosition(posX, posY) {
        return this.getByIndex(this.toIndex(posX), this.toIndex(posY))
    }

    getByRange(x1, x2, y1, y2) {
        const index = []

        this.toIndexRange(x1, x2).forEach(x => {
            this.toIndexRange(y1, y2).forEach(y => {
                const match = this.getByIndex(x, y)

                if (match) {
                    index.push(match)
                }
            })
        })

        return index
    }
}