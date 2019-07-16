import Input from '../../Input/Input'
import Component from "./Component"
import Vector from '../../Math/Vector';

export default class Run extends Component
{
    name = 'run'
    
    constructor (gameObject)
    {
        super(gameObject)
    }

    update (dt)
    {
        this.setDirection()
        this.run(dt)
    }

    setDirection ()
    {
        //Just left
        if (Input.left && !Input.right) {
            this.gameObject.direction = -1
            this.gameObject.heading = -1
        }
        
        //Just right
        else if (Input.right && !Input.left) {
            this.gameObject.direction = 1
            this.gameObject.heading = 1
        }

        //Both or none
        else {
            this.gameObject.direction = 0
        }
    }

    run (dt)
    {
        if (this.gameObject.direction > 0) {
            this.gameObject.acceleration.x = this.gameObject.speed
        }

        else if (this.gameObject.direction < 0) {
            this.gameObject.acceleration.x = -this.gameObject.speed
        }

        else {
            this.gameObject.decelerate(dt)            
        }

        const absoluteVelocityX = Math.abs(this.gameObject.velocity.x)

        if (absoluteVelocityX > this.gameObject.maxVelocity) {
            console.log('maior', this.gameObject.heading)
            this.gameObject.velocity.x = this.gameObject.maxVelocity * this.gameObject.heading
        }

        //Set max speed
        // if (Math.abs(this.gameObject.velocity.x) > this.gameObject.maxVelocity) {
        //     this.gameObject.velocity.x = this.gameObject.maxVelocity * this.gameObject.heading
        // }
    }
}