import Container from '../Container.js'
import Camera from '../Camera/Camera.js'
import Tile from "../SpriteSheet/Tile.js"
import TileCollider from "../Collision/TileCollider.js"

export default class TileLayer
{
    constructor (tilesGrid, columns, rows)
    {
        this.grid = tilesGrid
        this.columns = columns
        this.rows = rows
        this.tileCollider = new TileCollider(tilesGrid)
    }

    update (dt)
    {
        //
    }

    // Render all tiles
    render (g)
    {
        const { camera, display } = Container.modules()

        const buffer = display
            .createCanvas(display.width, display.height)
            .getContext('2d')

        // Render just the necessary tiles (inside camera)
        const xStart = Math.max(0,
            this.tileCollider.resolver.toIndex(camera.position.x)
            )
        
        const xEnd = Math.min(this.columns,
            this.tileCollider.resolver.toIndex(camera.position.x + camera.width)
            )

        const yStart = Math.min(0,
            this.tileCollider.resolver.toIndex(camera.position.y)
            )

        const yEnd = Math.min(this.rows,
            this.tileCollider.resolver.toIndex(camera.position.y + camera.height)
        )

        for (let x = xStart; x <= xEnd; x++) {

            for (let y = yStart; y < yEnd; y++) {
                
                const tile = this.grid.get(x, y)

                if (tile instanceof Tile)
                    this.grid.get(x, y).render(buffer, x, y)
            }
        }

        g.drawImage(buffer, -camera.position.x, -camera.position.y)
    }
}