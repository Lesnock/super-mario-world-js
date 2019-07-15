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
        this.gameObject.acceleration.x = this.gameObject.accelerationSpeed * this.gameObject.direction * dt

        //if its key down left or right //accelerate
        if (this.gameObject.direction !== 0) {
            this.gameObject.accelerate()
        }

        //if none key is pressed but the object is still moving
        else if (this.gameObject.velocity.x !== 0) {
            this.gameObject.decelerate()
        }

        //Set max speed
        if (Math.abs(this.gameObject.velocity.x) > this.gameObject.maxSpeed) {
            this.gameObject.velocity.x = this.gameObject.maxSpeed * this.gameObject.heading
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