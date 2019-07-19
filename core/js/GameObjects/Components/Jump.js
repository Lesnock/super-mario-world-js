import Component from "./Component"
import Input from '../../Input/Input'

export default class Jump extends Component
{
    name = 'jump'
    
    constructor (gameObject)
    {
        super(gameObject)
    }

    update (dt)
    {
        if (Input.up) {
            this.gameObject.velocity.y -= 1500 * dt
        }

        // //Up and Down
        // if (Input.up) {            
        //     this.gameObject.velocity.y -= 40
        // }
        // else if (Input.down) {
        //     this.gameObject.velocity.y += 40
        // }
        // else {
        //     this.gameObject.velocity.y = 0
        // }

        // if (this.gameObject.position.y > 300)
        //     this.gameObject.position.y = 300
    }
}