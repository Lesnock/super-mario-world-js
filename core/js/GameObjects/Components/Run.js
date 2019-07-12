import Input from '../../Input/Input'
import Component from "./Component"

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
        if (Input.left && !Input.right)
            this.gameObject.direction = -1
        
        //Just right
        else if (Input.right && !Input.left) 
            this.gameObject.direction = 1

        //Both or none
        else {
            this.gameObject.direction = 0
        }
    }

    run (dt)
    {
        const acceleration = this.gameObject.acceleration.x * dt * this.gameObject.direction

        console.log(acceleration)

        //Accelerate
        if (this.gameObject.direction !== 0) {
            this.gameObject.velocity.x += acceleration
        }

        //Decelerate
        else if (this.gameObject.velocity.x !== 0) {
            this.gameObject.velocity.x *= this.gameObject.friction
        }

        else {
            
        }
    }

    runLeft (dt)
    {
        let acceleration = Math.ceil(this.gameObject.acceleration.x * dt)

        if (this.gameObject.velocity.x > 0) {
            acceleration *= 2
        }

        this.gameObject.position.x -= acceleration

        //Max Velocity
        if (this.gameObject.velocity.x < -this.gameObject.maxVelocityX)
            this.gameObject.velocity.x = -this.gameObject.maxVelocityX
    }

    runRight (dt)
    {
        this.gameObject.direction = 1

        let acceleration = Math.ceil(this.gameObject.acceleration.x * dt)

        if (this.gameObject.velocity.x < 0) {
            acceleration *= 2
        }

        this.gameObject.velocity.x += acceleration

        //Max Velocity
        if (this.gameObject.velocity.x > this.gameObject.maxVelocityX)
            this.gameObject.velocity.x = this.gameObject.maxVelocityX
    }
}