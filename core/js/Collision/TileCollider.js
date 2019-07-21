import TileResolver from "./TileResolver";

export default class TileCollider
{
    constructor (tileGrid)
    {
        this.resolver = new TileResolver(tileGrid)
        TileCollider.instance = this
    }

    checkX (shape)
    {
        let xRange
        
        if (shape.gameObject.velocity.x > 0) {
            xRange = shape.xPosition + shape.width
        }

        else if (shape.gameObject.velocity.x < 0) {
            xRange = shape.xPosition
        }

        else {
            return
        }

        this.matchesX = this.resolver.getByRange(
            xRange, xRange,
            shape.yPosition, shape.yPosition + shape.height)

        this.matchesX.forEach(match => {

            if (match.tile.collider === null) {
                return
            }            

            const collider = match.tile.collider
            collider.checkX(shape, match)

        })
    }

    checkY (shape)
    {
        let yRange
        
        if (shape.gameObject.velocity.y > 0) {
            yRange = shape.yPosition + shape.height
        }

        else if (shape.gameObject.velocity.y < 0) {
            yRange = shape.yPosition
        }

        else {
            return
        }

        this.matchesY = this.resolver.getByRange(
            shape.xPosition, shape.xPosition + shape.width,
            yRange, yRange)

        this.matchesY.forEach(match => {

            if (match.tile.collider === null) {
                return
            }            

            const collider = match.tile.collider
            collider.checkY(shape, match)

        })
    }
}