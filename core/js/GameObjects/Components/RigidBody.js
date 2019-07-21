import Component from "./Component";
import TileCollider from "../../Collision/TileCollider";

export default class RigidBody extends Component
{
    name = 'rigidbody'

    constructor (gameObject)
    {
        super(gameObject)

        this.tileCollider = TileCollider.instance
    }

    update (dt)
    {
        //
    }

    onMoveY ()
    {
        this.matches = this.tileCollider.checkY(this.gameObject)
    }

    onMoveX ()
    {
        this.matches = this.tileCollider.checkX(this.gameObject)
    }

    render (g)
    {

        if (!this.matches) return

        this.matches.forEach(match => {

            // g.strokeStyle = 'red'
            // g.beginPath()
            // g.rect(
            //     this.gameObject.position.x,
            //     this.gameObject.position.y,
            //     marioWidth, marioHeight)
            // g.stroke()

            // g.strokeStyle = 'blue'
            // g.beginPath()
            // g.rect(
            //     match.x1,
            //     match.y1,
            //     match.tile.width, match.tile.height)
            // g.stroke()

        })
    }
}