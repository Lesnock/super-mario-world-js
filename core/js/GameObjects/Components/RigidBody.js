import Component from "./Component.js";
import Container from '../../Container.js'
import TileCollider from "../../Collision/TileCollider.js";

export default class RigidBody extends Component {
    name = 'rigidbody'

    constructor(gameObject) {
        super(gameObject)

        this.debug = Container.getModule('debug')

        this.tileCollider = TileCollider.instance
    }

    // When object move horizontally
    onMoveX() {
        this.gameObject.shapes.forEach(shape => {
            this.tileCollider.checkX(shape)
        })
    }

    // When object move vertically
    onMoveY() {
        this.gameObject.shapes.forEach(shape => {
            this.tileCollider.checkY(shape)
        })
    }

    render(g) {
        if (!this.debug) return

        // Draw shapes lines
        this.gameObject.shapes.forEach(shape => {
            shape.render(g)
        })

        if (this.tileCollider.matchesX.lenght === 0 || this.tileCollider.matchesY.lenght === 0) {
            return
        }

        const matches = this.tileCollider.matchesX.concat(this.tileCollider.matchesY)

        matches.forEach(match => {
            g.strokeStyle = 'blue'
            g.beginPath()
            g.rect(
                match.x1 - this.gameObject.camera.position.x,
                match.y1 - this.gameObject.camera.position.y,
                match.tile.width, match.tile.height)
            g.stroke()
        })
    }
}