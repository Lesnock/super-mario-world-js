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
        this.tileCollider.checkY(this.gameObject)
    }

    onMoveX ()
    {
        this.tileCollider.checkX(this.gameObject)
    }

    render (g)
    {
        // const marioHeight = 15
        // const marioWidth = 14

        // this.matches.forEach(match => {

        //     g.strokeStyle = 'red'
        //     g.beginPath()
        //     g.rect(
        //         this.gameObject.position.x,
        //         this.gameObject.position.y,
        //         marioWidth, marioHeight)
        //     g.stroke()

        //     g.strokeStyle = 'blue'
        //     g.beginPath()
        //     g.rect(
        //         match.x1,
        //         match.y1,
        //         match.tile.width, match.tile.height)
        //     g.stroke()

        // })
    }
}