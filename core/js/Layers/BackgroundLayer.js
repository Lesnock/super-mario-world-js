import Tile from "../SpriteSheet/Tile";

export default class BackgroundLayer
{
    constructor (tilesGrid, columns, rows)
    {
        this.grid = tilesGrid
        this.columns = columns
        this.rows = rows
    }

    update (dt)
    {
        //
    }

    render (g)
    {
        // this.grid.forEach((tile, x, y) => {
        //     tile.render(g, x, y)
        // })

        for (let x = 0; x < this.columns; x++) {

            for (let y = 0; y < this.rows; y++) {
                
                const tile = this.grid.get(x, y)

                if (tile instanceof Tile)
                    this.grid.get(x, y).render(g, x, y)                
            }
        }
    }
}