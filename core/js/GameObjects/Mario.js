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

        // Run component inital config
        this.run.acceleration = 400

        this.run.slowAcceleration = 400
        this.run.fastAcceleration = 1000
        this.run.superFastAcceleration = 800

        this.run.deceleration = 200

        // Gravity initial config
        this.gravity.acceleration = 800

        // Jump initial config
        this.jump.acceleration = 200
    }

    update(dt) {
        this.defineCurrentSprite()
    }

    render(g) {
        const yPosition = this.defineYPosition()

        // Will ever render the current sprite property
        return this.sheet.drawSprite(g, this.currentSprite, this.position.x, yPosition)
    }

    isIdle() {
        return this.velocity.x === 0 && this.velocity.y === 0
    }

    // Define what animation is gonna roll
    defineCurrentSprite() {
        if (this.jump.isJumping()) {
            return this.lookDirection > 0
                ? this.currentSprite = 'jump-right'
                : this.currentSprite = 'jump-left'
        }

        if (this.jump.isFalling()) {
            return this.lookDirection > 0
                ? this.currentSprite = 'falling-right'
                : this.currentSprite = 'falling-left'
        }

        // Mario is not moving
        if (this.isIdle()) {
            return this.lookDirection > 0
                    ? this.currentSprite = 'idle-right'
                    : this.currentSprite = 'idle-left'
        }

        // If it is moving
        else {
            // if player is pressing left while mario is going right
            if (this.lookDirection < 0 && this.velocity.x > 0) {
                return this.currentSprite = 'dash-left'
            }
            // if player is pressing left while mario is going right
            else if (this.lookDirection > 0 && this.velocity.x < 0) {
                return this.currentSprite = 'dash-right'
            }
            else {
                return this.lookDirection > 0
                    ? this.sheet.runAnimation('run-slow-right', this)
                    : this.sheet.runAnimation('run-slow-left', this)
            }
        }
    }

    defineYPosition() {
        const currentFrame = this.currentSprite

        let yPosition = this.position.y

        // Mario's mini jumping when running
        if (currentFrame == 'run-right-2' ||
            currentFrame == 'run-fast-right-1' ||
            currentFrame == 'run-left-1' ||
            currentFrame == 'run-fast-left-1') {
            yPosition -= 1
        }

        return yPosition
    }
}