import Component from "./Component"
import Vector from "../../Math/Vector";

export default class RigidBody extends Component
{

    hasGravity = true

    constructor (gameObject)
    {
        super(gameObject)

        this.name = 'rigidbody'

        if (this.hasGravity)
            this.gravity = new Vector(0, 0)
    }

    update (dt)
    {
        if (this.hasGravity)
            this.addGravity()
    }

    addGravity ()
    {        
        if (this.gameObject.position.y < 300) {
            this.gameObject.velocity.addVector(this.gravity)
        }
    }
}