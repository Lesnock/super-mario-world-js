import Component from "./Component.js"
import Input from '../../Input/Input.js'

export default class Jump extends Component
{
    name = 'jump'

    constructor (gameObject) {
        super(gameObject)

        // Time to keep going up in seconds
        this.duration = 0.1

        // Acceleration of the jump
        this.acceleration = 200

        // Timer that counts how much time the jump has to stop
        this.timer = 0

        // Defines if object is ready to jump
        this.ready = false
    }

    update (dt) {
        if (this.timer > 0) {
            this.gameObject.velocity.y = -this.acceleration
            return this.timer -= dt
        }

        // On button press
        if (Input.up) {
            if (this.ready) {
                this.start()
            }
        }

        // In every update ready is set to false
        // But if it is ready, obstructs function will turn it to true
        this.ready = false
    }

    obstructs (side) {
        if (side === 'bottom') {
            this.ready = true
        }

        if (side === 'top') {
            this.cancel()
        }
    }

    // Starts the jump
    start () {
        this.timer = this.duration
    }

    // Cancel the jump
    cancel () {
        this.timer = 0
    }

    // Defines if object is jumping (going up)
    isJumping () {
        return !this.ready && this.gameObject.velocity.y < 0
    }

    // Defines if object is falling (going down)
    isFalling () {
        return !this.ready && this.gameObject.velocity.y > 0
    }
}