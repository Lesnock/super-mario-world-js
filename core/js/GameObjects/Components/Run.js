import Input from '../../Input/Input'
import Component from "./Component"

export default class Run extends Component
{
    name = 'run'
    
    constructor (gameObject)
    {
        super(gameObject)
        //this.input = new Input(new KeyboardController())
    }

    update ()
    {
        this.setCurrentAnimation()

        //Left and Right
        if (Input.left) {

            //No dash on flip
            if (this.gameObject.velocity.x > 0)
                this.gameObject.velocity.x = 0

            this.gameObject.velocity.x -= this.gameObject.acceleration.x

            //Max Velocity
            if (this.gameObject.velocity.x < -30)
                this.gameObject.velocity.x = -this.gameObject.maxVelocityX
        }
        else if (Input.right) {
            //No dash on flip
            if (this.gameObject.velocity.x < 0)
                this.gameObject.velocity.x = 0

            this.gameObject.velocity.x += this.gameObject.acceleration.x

            //Max Velocity
            if (this.gameObject.velocity.x > 30)
                this.gameObject.velocity.x = this.gameObject.maxVelocityX
        }
        else {
            this.gameObject.velocity.x = 0
        }
    }

    setCurrentAnimation ()
    {
        if (this.isRunningRight())
            this.gameObject.currentAnimation = 'run-right'

        else if (this.isRunningLeft())
            this.gameObject.currentAnimation = 'run-left'

        else if (this.isIdle())
            this.gameObject.currentAnimation = 'run-right'
    }

    isRunningRight ()
    {
        return this.gameObject.velocity.x > 0
    }

    isRunningLeft ()
    {
        return this.gameObject.velocity.x < 0
    }

    isIdle ()
    {
        return this.gameObject.velocity.x == 0
    }
}