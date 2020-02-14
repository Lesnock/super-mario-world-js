import Component from "./Component.js"
import Input from '../../Input/Input.js'

export default class Run extends Component {
    name = 'run'

    constructor(gameObject) {
        super(gameObject)

        this.acceleration = 200
        this.deceleration = 200        
        this.maxVelocity = 100
        this.distance = 0

        // Detect if gameObject is touching the ground
        this.onGround = false

        // What direction player is pressing
        // -1 = left, 0 = none, 1 = right
        this.pressingDirection = 0
    }

    update(dt) {
        // Detect what direction player is pressing, 
        // and set it to the pressingDirection prop
        this.setPressingDirection()

        const absVelocityX = Math.abs(this.gameObject.velocity.x)
        const velocityXSign = Math.sign(this.gameObject.velocity.x)

        // if some direction is beeing pressed
        if (this.pressingDirection !== 0) {
            // Already started running
            if (this.distance > 0) {
                // On dash decelerate
                if (velocityXSign !== this.pressingDirection) {
                    this.decelerate(dt)
                }
            }

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
        const absVelocityX = Math.abs(this.gameObject.velocity.x)

        if (absVelocityX <= this.maxVelocity) {
            this.gameObject.velocity.x +=this.acceleration * this.pressingDirection * dt
        }
        else {
            this.gameObject.velocity.x = this.maxVelocity * this.pressingDirection
        }
    }

    decelerate (dt) {
        const absVelocityX = Math.abs(this.gameObject.velocity.x)

        // deceleration can't be major than the velocity
        const decel = Math.min(absVelocityX, this.deceleration * dt)

        this.gameObject.velocity.x += (this.gameObject.velocity.x > 0)
            ? -decel
            : decel
    }

    setPressingDirection() {
        if (Input.right && !Input.left) {
            this.pressingDirection = 1
        }
        else if (Input.left && !Input.right) {
            this.pressingDirection = -1
        }
        else {
            this.pressingDirection = 0
        }
    }

    obstructs (side) {
        if (side === 'bottom') {
            this.onGround = true
        }
    }
}