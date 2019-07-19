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
        const matches = this.resolver.getByRange(
            gameObject.position.x, gameObject.position.x + gameObject.width,
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
    }

    checkY (gameObject)
    {
        const matches = this.resolver.getByRange(
            gameObject.position.x, gameObject.position.x + gameObject.width,
            gameObject.position.y, gameObject.position.y + gameObject.height)

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
    }
}