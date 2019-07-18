import Component from "./Component";
import TileCollider from "../../Collision/TileCollider";

export default class RigidBody extends Component
{
    name = 'rigidbody'

    constructor (gameObject)
    {
        super(gameObject)

        this.tileCollider = TileCollider.instance
        this.gravity = 10000
    }

    update (dt)
    {
        this.match = this.tileCollider.resolver.getByPosition(this.gameObject.position.x, this.gameObject.position.y + 28)

        if (this.gameObject.velocity.y > 0) {

            if (this.match.tile.collider === null) {
                return
            }

            if (this.gameObject.position.y + 28 > this.match.y1) {
                this.gameObject.position.y = this.match.y1 - 28
                this.gameObject.velocity.y = 0
            }
        }
    }

    render (g)
    {
        g.strokeStyle = 'blue'
        g.beginPath()
        g.rect(
            this.match.x1,
            this.match.y1,
            this.match.tile.width, this.match.tile.height)
        g.stroke()
    }
}