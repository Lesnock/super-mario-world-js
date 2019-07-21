import Component from "./Component";
import TileCollider from "../../Collision/TileCollider";

export default class RigidBody extends Component
{
    name = 'rigidbody'

    constructor (gameObject)
    {
        super(gameObject)

        this.debug = false

        this.tileCollider = TileCollider.instance
    }

    onMoveX ()
    {
        this.gameObject.shapes.forEach(shape => {
            this.tileCollider.checkX(shape)  
        })
    }

    onMoveY ()
    {
        this.gameObject.shapes.forEach(shape => {
            this.tileCollider.checkY(shape)  
        })
    }

    render (g)
    {
        if (!this.debug) return

        if (!this.tileCollider.matchesX || !this.tileCollider.matchesY) return

        const matches = this.tileCollider.matchesX.concat(this.tileCollider.matchesY)

        matches.forEach(match => {

            g.strokeStyle = 'red'
            g.beginPath()
            g.rect(
                this.gameObject.position.x,
                this.gameObject.position.y,
                this.gameObject.width, this.gameObject.height)
            g.stroke()

            g.strokeStyle = 'blue'
            g.beginPath()
            g.rect(
                match.x1,
                match.y1,
                match.tile.width, match.tile.height)
            g.stroke()

        })
    }
}