import Component from "./Component.js"
import Input from '../../Input/Input.js'

export default class Run extends Component {
    name = 'run'

    constructor(gameObject) {
        super(gameObject)

        this.acceleration = 0
        this.deceleration = 0

        // What direction player is pressing
        // -1 = left, 0 = none, 1 = right
        this.pressingDirection = 0

        this.maxVelocity = 10000
        this.distance = 0
    }

    update(dt) {
        // Detect what direction player is pressing, 
        // and set it to the pressingDirection prop
        this.setPressingDirection()

        const absVelocityX = Math.abs(this.gameObject.velocity.x)

        // if some direction is beeing pressed
        if (this.pressingDirection !== 0) {
            this.gameObject.isIdle = false
            this.gameObject.lookDirection = this.pressingDirection > 0 ? 'right' : 'left'
            this.gameObject.velocity.x += this.acceleration * this.pressingDirection * dt
        }
        // if none direction is beeing pressed, but 
        // the gameObject still moving yet
        else if (this.gameObject.velocity.x !== 0) {
            // deceleration can't be major than the velocity
            const decel = Math.min(absVelocityX, this.deceleration * dt)

            this.gameObject.velocity.x += (this.gameObject.velocity.x > 0)
                ? -decel
                : decel
        }

        else {
            this.distance = 0
            this.gameObject.isIdle = true
        }
        
        this.distance =+ absVelocityX * dt
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
}