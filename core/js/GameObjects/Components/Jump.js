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

        // Timer that counts how much time the jump has to stop going up
        this.jumpTimer = 0

        // Amount of time that jump button was pressed
        this.requestTimer = 0;

        // Amount of time that jump can happen before object touch the ground
        this.gracePeriod = 0.1;

        // Defines if object is on ground
        this.onGround = false

        // If input up is released during the jump, the 
        Input.instance().addReleaseMapping('up', () => {
            if (!this.onGround) {
                this.cancel()
            }
        })
    }

    update (dt) {
        // If during the request timer objects touch the ground,
        // the jump will start automatically (grace period)
        if (this.requestTimer > 0) {
            if (this.onGround) {
                // starts jump timer
                this.jumpTimer = this.duration
                this.requestTimer = 0
            }

            this.requestTimer -= dt
        }

        // If timer is not 0, the jump can keep going up
        if (this.jumpTimer > 0) {
            // Boost = game object goes up depending on velocity x
            const boost = Math.abs(this.gameObject.velocity.x) * this.speedBoost
            this.gameObject.velocity.y = -(this.acceleration + boost)

            this.jumpTimer -= dt
        }

        // In every update ready is set to false
        // But if it is ready, obstructs function will turn it to true
        this.onGround = false
    }

    obstructs (side) {
        if (side === 'bottom') {
            this.onGround = true
        }

        if (side === 'top') {
            this.cancel()
        }
    }

    // Starts the jump
    start () {
        this.requestTimer = this.gracePeriod
    }

    // Cancel the jump
    cancel () {
        this.jumpTimer = 0
    }

    // Defines if object is jumping (going up)
    isJumping () {
        return !this.onGround && this.gameObject.velocity.y < 0
    }

    // Defines if object is falling (going down)
    isFalling () {
        return !this.onGround && this.gameObject.velocity.y > 0
    }
}