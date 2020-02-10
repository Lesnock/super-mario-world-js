import Component from "./Component.js"
import Input from '../../Input/Input.js'

export default class Run extends Component {
    name = 'run'

    constructor(gameObject) {
        super(gameObject)

        this.speed = 0
        this.break = 0

        this.maxVelocity = 10000
        this.distance = 0
    }

    update(dt) {
        if (Input.right && !Input.left) {
            this.gameObject.lookDirection = 'right'
            this.gameObject.isIdle = false
            this.gameObject.acceleration.x = this.speed
        }
        else if (Input.left && !Input.right) {
            this.gameObject.lookDirection = 'left'
            this.gameObject.isIdle = false
            this.gameObject.acceleration.x = -this.speed
        }
        else {
            this.gameObject.acceleration.x = 0

            if (Math.abs(this.gameObject.velocity.x) > 0) {
                this.gameObject.isIdle = false
            }
            else {
                this.gameObject.isIdle = true
            }
        }
    }
}