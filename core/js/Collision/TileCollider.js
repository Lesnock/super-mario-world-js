import TileResolver from "./TileResolver";

export default class TileCollider
{
    constructor (tileGrid)
    {
        this.resolver = new TileResolver(tileGrid)
        TileCollider.instance = this
    }

    checkX (gameObject)
    {
        let xRange
        
        if (gameObject.velocity.x > 0) {
            xRange = gameObject.position.x + gameObject.width
        }

        else if (gameObject.velocity.x < 0) {
            xRange = gameObject.position.x
        }

        else {
            return
        }

        const matches = this.resolver.getByRange(
            xRange, xRange,
            gameObject.position.y, gameObject.position.y + gameObject.height)
        
        matches.forEach(match => {

            if (match.tile.collider === null) {
                return
            }

            if (gameObject.velocity.x > 0) {

                if (gameObject.position.x + gameObject.width > match.x1) {
                    gameObject.position.x = match.x1 - gameObject.width
                    gameObject.velocity.x = 0
                }
            }

            else if (gameObject.velocity.x < 0) {

                if (gameObject.position.x < match.x2) {
                    gameObject.position.x = match.x2
                    gameObject.velocity.x = 0
                }

            }

        })

        return matches
    }

    checkY (gameObject)
    {
        let yRange
        
        if (gameObject.velocity.y > 0) {
            yRange = gameObject.position.y + gameObject.height
        }

        else if (gameObject.velocity.y < 0) {
            yRange = gameObject.position.y
        }

        else {
            return
        }

        const matches = this.resolver.getByRange(
            gameObject.position.x, gameObject.position.x + gameObject.width,
            yRange, yRange)

        matches.forEach(match => {
        
            if (match.tile.collider === null) {
                return
            }

            if (gameObject.velocity.y > 0) {

                if (gameObject.position.y + gameObject.height > match.y1) {
                    gameObject.position.y = match.y1 - gameObject.height
                    gameObject.velocity.y = 0
                }
            }

            else if (gameObject.velocity.y < 0) {

                if (gameObject.position.y < match.y2) {
                    gameObject.position.y = match.y2
                    gameObject.velocity.y = 0
                }
            }
        })

        return matches
    }
}