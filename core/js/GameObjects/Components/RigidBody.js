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
        const marioHeight = 48
        const marioWidth = 32

        this.matches = this.tileCollider.resolver.getByRange(
            this.gameObject.position.x, this.gameObject.position.x + marioWidth,
            this.gameObject.position.y, this.gameObject.position.y + marioHeight)

        this.matches.forEach(match => {
        
            if (match.tile.collider === null) {
                return
            }

            if (this.gameObject.velocity.y > 0) {

                if (this.gameObject.position.y + marioHeight > match.y1) {
                    this.gameObject.position.y = match.y1 - marioHeight
                    this.gameObject.velocity.y = 0
                }
            }

            else if (this.gameObject.velocity.y < 0) {

                if (this.gameObject.position.y < match.y2) {
                    this.gameObject.position.y = match.y2
                    this.gameObject.velocity.y = 0
                }
            }
        })
    }

    onMoveX ()
    {
        const marioHeight = 48
        const marioWidth = 32

        this.matches = this.tileCollider.resolver.getByRange(
            this.gameObject.position.x, this.gameObject.position.x + marioWidth,
            this.gameObject.position.y, this.gameObject.position.y + marioHeight)
        
        this.matches.forEach(match => {

            if (match.tile.collider === null) {
                return
            }

            if (this.gameObject.velocity.x > 0) {

                if (this.gameObject.position.x + marioWidth > match.x1) {
                    this.gameObject.position.x = match.x1 - marioWidth
                    this.gameObject.velocity.x = 0
                }
            }

            else if (this.gameObject.velocity.x < 0) {

                if (this.gameObject.position.x < match.x2) {
                    this.gameObject.position.x = match.x2
                    this.gameObject.velocity.x = 0
                }

            }

        })
    }

    render (g)
    {
        this.matches.forEach(match => {

            g.strokeStyle = 'red'
            g.beginPath()
            g.rect(
                this.gameObject.position.x,
                this.gameObject.position.y,
                16, 26)
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