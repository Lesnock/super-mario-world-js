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
        // and set to the pressingDirection property
        this.setPressingDirection()

        // if some direction is beeing pressed
        if (this.pressingDirection !== 0) {
            this.gameObject.lookDirection = 'right'
            this.gameObject.isIdle = false
            this.gameObject.acceleration.x = this.acceleration
        }
        // if none direction is beeing pressed, but 
        // the gameObject still moving yet
        else if (this.gameObject.velocity.x !== 0) {

        }

        else {

        }

        // if (Input.right && !Input.left) {
        //     this.gameObject.lookDirection = 'right'
        //     this.gameObject.isIdle = false
        //     this.gameObject.acceleration.x = this.acceleration
        // }
        // else if (Input.left && !Input.right) {
        //     this.gameObject.lookDirection = 'left'
        //     this.gameObject.isIdle = false
        //     this.gameObject.acceleration.x = -this.acceleration
        // }
        // else {
        //     this.gameObject.acceleration.x = 0

        //     if (Math.abs(this.gameObject.velocity.x) > 0) {
        //         this.gameObject.isIdle = false
        //     }
        //     else {
        //         this.gameObject.isIdle = true
        //     }
        // }
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