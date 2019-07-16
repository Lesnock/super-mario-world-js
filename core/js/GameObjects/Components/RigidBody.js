import Component from "./Component";
import TileCollider from "../../Collision/TileCollider";

export default class RigidBody extends Component
{
    name = 'rigidbody'

    constructor (gameObject)
    {
        super(gameObject)
    }

    update (dt)
    {
        // const collider = TileCollider.instance.resolver
        //                 .getByPosition(this.gameObject.position.x, this.gameObject.position.y).collider

        // if (collider) {
        //     //console.log(collider.check(this.gameObject))
        // }
    }
}