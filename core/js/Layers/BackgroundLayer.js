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
        for (let x = 0; x < this.columns; x++) {

            for (let y = 0; y < this.rows; y++) {
                
                const tile = this.grid.get(x, y)

                if (tile instanceof Tile)
                    this.grid.get(x, y).render(g, x, y)                
            }
        }
    }
}