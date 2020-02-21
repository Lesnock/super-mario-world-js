import Run from './Components/Run.js'
import Input from '../Input/Input.js'
import Jump from './Components/Jump.js'
import GameObject from './GameObject.js'
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
        this.run.deceleration = 200

        // Gravity initial config
        this.gravity.acceleration = 800

        // Jump initial config
        this.jump.acceleration = 230
    }

    mapping(input) {
        // Run fast
        input.addPressMapping('run', () => {
            this.run.setTurbo(true)
        })

        // Run slow
        input.addReleaseMapping('run', () => {
            this.run.setTurbo(false)
        })

        // Starts jump
        input.addPressMapping('up', () => {
            this.jump.start()
        })
    }

    update(dt) {
        this.definePressingDirection()
        this.defineCurrentSprite()

        this.camera.centerOnObject(this)
    }

    render(g) {
        const yPosition = this.defineYPosition()
        
        // Will ever render the current sprite property
        return this.sheet.drawSprite(
            g, 
            this.currentSprite,
            this.position.x - this.camera.position.x,
            yPosition - this.camera.position.y
        )
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
                // Running fast
                if (this.run.turbo && Math.abs(this.velocity.x) > 120) {
                    return this.lookDirection > 0
                        ? this.sheet.runAnimation('run-fast-right', this)
                        : this.sheet.runAnimation('run-fast-left', this)
                }
                // Running slow
                else {
                    return this.lookDirection > 0
                        ? this.sheet.runAnimation('run-right', this)
                        : this.sheet.runAnimation('run-left', this)
                }                
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

    definePressingDirection() {
        if (Input.right && !Input.left) {
            this.run.pressingDirection = 1
        }
        else if (Input.left && !Input.right) {
            this.run.pressingDirection = -1
        }
        else {
            this.run.pressingDirection = 0
        }
    }
}