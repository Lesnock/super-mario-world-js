import Component from "./Component.js"
import Input from '../../Input/Input.js'

export default class Run extends Component {
    name = 'run'

    constructor(gameObject) {
        super(gameObject)

        this.acceleration = 200
        this.deceleration = 200

        this.friction = 1/800

        // Defines if object is on turbo mode (minor friction)
        this.turbo = false
        
        // Distance that gameObject has ran
        this.distance = 0

        // Status of running
        // 0 = slow, 1 = fast, 2 = super fast
        this.status = 0

        // Detect if gameObject is touching the ground
        this.onGround = false

        // What direction player is pressing
        // -1 = left, 0 = none, 1 = right
        this.pressingDirection = 0
    }

    update(dt) {
        const absVelocityX = Math.abs(this.gameObject.velocity.x)

        //Add friction to velocity
        const friction = (this.turbo) ? 1/5000 : 1/800
        this.gameObject.velocity.x -= friction * this.gameObject.velocity.x * absVelocityX

        // if some direction is beeing pressed
        if (this.pressingDirection !== 0) {
            this.gameObject.lookDirection = this.pressingDirection
            this.accelerate(dt)
        }
        // if none direction is beeing pressed, but 
        // the gameObject still moving yet
        else if (this.gameObject.velocity.x !== 0) {
            this.decelerate(dt)
        }

        else {
            this.distance = 0
        }
        
        this.distance =+ absVelocityX * dt

        // It is set to false, obstructs will turn it to true
        this.onGround = false
    }

    // Accelerates object if it has not reach max velocity
    accelerate (dt) {        
        return this.gameObject.velocity.x += this.acceleration * this.pressingDirection * dt
    }

    decelerate (dt) {
        const absVelocityX = Math.abs(this.gameObject.velocity.x)

        // deceleration can't be major than the velocity
        const decel = Math.min(absVelocityX, this.deceleration * dt)

        this.gameObject.velocity.x += (this.gameObject.velocity.x > 0)
            ? -decel
            : decel
    }

    setTurbo(isTurbo) {
        this.turbo = isTurbo
    }

    obstructs (side) {
        if (side === 'bottom') {
            this.onGround = true
        }
    }
}