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

        // Boost depending on x-velocity
        this.speedBoost = 0.3

        // Timer that counts how much time the jump has to stop
        this.timer = 0

        // Defines if object is ready to jump
        this.ready = false

        // If input up is released during the jump, the 
        Input.instance().addReleaseMapping('up', () => {
            if (!this.ready) {
                this.cancel()
            }
        })
    }

    update (dt) {
        // If timer is not 0, the jump can keep going up
        if (this.timer > 0) {
            // Boost = game object goes up depending on velocity x
            const boost = Math.abs(this.gameObject.velocity.x) * this.speedBoost
            this.gameObject.velocity.y = -(this.acceleration + boost)

            this.timer -= dt
        }
        else {
            // Just start jump if it is ready
            if (this.ready && Input.up) {
                this.start()
            }
        }

        // In every update ready is set to false
        // But if it is ready, obstructs function will turn it to true
        this.ready = false
    }

    obstructs (side) {
        if (side === 'bottom') {
            // Not allow jump to keep happen when the input is pressed forever
            if (!Input.up) {
                this.ready = true
            }
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