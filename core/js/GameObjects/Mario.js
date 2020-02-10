import Run from './Components/Run.js'
import Input from '../Input/Input.js'
import Jump from './Components/Jump.js'
import GameObject from "./GameObject.js"
import RigidBody from './Components/RigidBody.js'
import Square from '../Collision/Shapes/Square.js'
import loadSpriteSheet from '../Loaders/SpriteSheetLoader.js'

export default class Mario extends GameObject {
    components = [
        new Run(this),
        // new RigidBody(this),
        // new Jump(this),
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

        // Defines if mario's looking direction
        this.lookDirection = 'right'

        // Defines if mario is idle
        this.isIdle = true

        // Run component inital config
        this.run.speed = 400
    }

    update(dt) {
        if (this.isIdle) {
            return this.currentSprite = `idle-${this.lookDirection}`
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

    updateAnimation() {
        this.sheet.animations.get(this.currentAnimation).update()
    }

    defineCurrentAnimation() {
        if (!this.isIdle) {
            this.currentAnimation = this.lookDirection === 'right'                
                ? 'run-right'
                : 'run-left'
        }
    }
}