import Run from './Components/Run.js'
import Input from '../Input/Input.js'
import Jump from './Components/Jump.js'
import GameObject from "./GameObject.js"
import Gravity from './Components/Gravity.js'
import RigidBody from './Components/RigidBody.js'
import Square from '../Collision/Shapes/Square.js'
import loadSpriteSheet from '../Loaders/SpriteSheetLoader.js'

export default class Mario extends GameObject {
    components = [
        new Run(this),
        new RigidBody(this),
        new Gravity(this),
        new Jump(this),
    ]

    shapes = [
        new Square(this, 0, 0, 16, 28),
    ]

    constructor() {
        super()
        this.width = 14
        this.height = 29
    }

    async init() {
        this.sheet = await loadSpriteSheet('mario')

        // Mario's current sprite and animation
        // currentSprite will be used if mario is idle
        this.currentSprite = 'idle-right'

        // currentAnimation will be used if mario is animated (moving)
        this.currentAnimation = 'running-right'

        // Defines mario's looking direction
        // -1 = left, 1 = right
        this.lookDirection = 1

        // Defines if mario is idle
        this.isIdle = true

        // Run component inital config
        this.run.acceleration = 400
        this.run.deceleration = 300

        // Gravity initial config
        this.gravity.acceleration = 1000
    }

    update(dt) {
        if (this.isIdle) {
            return this.currentSprite = (this.lookDirection > 0)
                ? 'idle-right'
                : 'idle-left'
        }

        this.defineCurrentAnimation()
        this.updateAnimation()
    }

    render(g) {
        if (this.isIdle) {
            return this.sheet.drawSprite(g, this.currentSprite, this.position.x, this.position.y)
        }

        this.sheet.drawAnimation(g, this.currentAnimation, this.position.x, this.position.y)
    }

    // update animation frames
    updateAnimation() {
        this.sheet.animations.get(this.currentAnimation).update()
    }

    // Define what animation is gonna roll
    defineCurrentAnimation() {
        if (this.jump.isFalling()) {
            return this.currentAnimation = 'falling-right'
        }

        if (!this.isIdle) {
            // if player is pressing left while mario is going right
            if (this.lookDirection < 0 && this.velocity.x > 0) {
                return this.currentAnimation = 'dash-left'
            }
            // if player is pressing left while mario is going right
            else if (this.lookDirection > 0 && this.velocity.x < 0) {
                return this.currentAnimation = 'dash-right'
            }
            else {
                return this.currentAnimation = this.lookDirection > 0
                    ? 'run-right'
                    : 'run-left'
            }
        }
    }
}