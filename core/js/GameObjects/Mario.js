import Run from './Components/Run'
import Jump from './Components/Jump'
import GameObject from "./GameObject"
import RigidBody from './Components/RigidBody'
import loadSpriteSheet from '../Loaders/SpriteSheetLoader';

export default class Mario extends GameObject
{
    components = [
        new Run(this),
        new Jump(this),
        //new RigidBody(this)
    ]

    constructor ()
    {
        super()

        this.accelerationSpeed = 20
        this.runningFastSpeed = 9
        this.maxSpeed = 10

        this.friction = 0.65

        this.direction = 1
        this.heading = 1

        this.position.y = 115

        this.loadSprites()
    }

    update (dt)
    {
        this.setCurrentAnimation()

        if (this.sheet) {
            if (this.sheet.animations.get(this.currentAnimation).getCurrentSprite() == 'run-right-1')
                this.position.y = 114
            else 
                this.position.y = 115
            
            //Animation
            this.sheet.animations.get(this.currentAnimation).update()
        }

        this.position.x = Math.ceil(this.position.x)
    }

    render (g)
    {
        //wait for async json load
        if (this.sheet) {
            this.sheet.drawAnimation(g, this.currentAnimation, this.position.x, this.position.y)
        }
    }

    async loadSprites ()
    {
        this.sheet = await loadSpriteSheet('mario')
    }

    setCurrentAnimation ()
    {
        //Pressing right
        if (this.isPressingRight()) {
            //Turning around
            if (this.velocity.x < 0)
                this.currentAnimation = 'dash-right'

            //Running Moderate
            else if (this.isRunningModerate())
                this.currentAnimation = 'run-right'

            //Running fast
            else if (this.isRunningFast())
                this.currentAnimation = 'run-fast-right'
        }

        //Pressing left
        else if (this.isPressingLeft()) {

            //Turning around
            if (this.velocity.x > 0)
                this.currentAnimation = 'dash-left'

            //Running Moderate
            else if (this.isRunningModerate())
                this.currentAnimation = 'run-left'

            //Running fast
            else if (this.isRunningFast())
                this.currentAnimation = 'run-fast-left'
        }

        //Pressing none or both
        else {
            //Desacelerating
            if (this.velocity.x > 0)
                this.currentAnimation = 'run-right'
            
            if (this.velocity.x < 0)
                this.currentAnimation = 'run-left'
        }

        //Idle
        if (this.isIdle()) {
            if (this.heading > 0)
                this.currentAnimation = 'idle-right'
            else
                this.currentAnimation = 'idle-left'
        }
    }

    isIdle ()
    {
        return (this.velocity.x == 0)
    }

    isPressingRight ()
    {
        return !!(this.direction > 0)
    }

    isPressingLeft ()
    {
        return (this.direction < 0)
    }

    isRunningModerate ()
    {
        const absoluteVelocityX = Math.abs(this.velocity.x)
        return (
            absoluteVelocityX > 0 & 
            absoluteVelocityX < this.runningFastSpeed
        )
    }

    isRunningFast ()
    {
        const absoluteVelocityX = Math.abs(this.velocity.x)
        return (
            absoluteVelocityX > 0 & 
            absoluteVelocityX > this.runningFastSpeed)
    }
}