import Input from '../../Input/Input'
import Component from "./Component"

export default class Run extends Component
{
    name = 'run'
    
    constructor (gameObject)
    {
        super(gameObject)
    }

    update ()
    {
        //Left and Right
        if (Input.left)
            this.runLeft()
        
        else if (Input.right) 
            this.runRight()
            
        else
            this.gameObject.velocity.x = 0
    }

    runLeft ()
    {
        this.gameObject.direction = -1

        //No dash on flip
        if (this.gameObject.velocity.x > 0)
            this.gameObject.velocity.x = 0

        this.gameObject.velocity.x -= this.gameObject.acceleration.x

        //Max Velocity
        if (this.gameObject.velocity.x < -30)
            this.gameObject.velocity.x = -this.gameObject.maxVelocityX
    }

    runRight ()
    {
        this.gameObject.direction = 1

        //No dash on flip
        if (this.gameObject.velocity.x < 0)
            this.gameObject.velocity.x = 0

        this.gameObject.velocity.x += this.gameObject.acceleration.x

        //Max Velocity
        if (this.gameObject.velocity.x > 30)
            this.gameObject.velocity.x = this.gameObject.maxVelocityX
    }
}