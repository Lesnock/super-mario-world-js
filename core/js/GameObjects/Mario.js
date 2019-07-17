import Run from './Components/Run'
import Jump from './Components/Jump'
import GameObject from "./GameObject"
import RigidBody from './Components/RigidBody'
import loadSpriteSheet from '../Loaders/SpriteSheetLoader';

export default class Mario extends GameObject
{
    components = [
        new Run(this),
        new RigidBody(this)
        //new Jump(this),
    ]

    constructor ()
    {
        super()

        this.friction = 1/50

        this.position.y = 115

        this.loadSprites()
    }

    async init ()
    {
        this.run.speed = 400
        this.run.break = 300

        this.run.fastSpeed = 200
        this.run.maxVelocity = 300
    }

    update (dt)
    {
        if (this.isIdle())
            return

        this.setCurrentAnimation()

        if (this.sheet) {
            const sprite = this.sheet.animations.get(this.currentAnimation).getCurrentSprite()

            if (sprite == 'run-right-1' || sprite == 'run-left-1' || sprite == 'run-fast-right-1' || sprite == 'run-fast-left-1')
                this.position.y = 114
            else 
                this.position.y = 115
            
            //Animation
            this.sheet.animations.get(this.currentAnimation).update()
        }

        this.position.x = (this.velocity.x > 0) ? Math.ceil(this.position.x) : Math.floor(this.position.x)
    }

    render (g)
    {
        //wait for async json load
        if (this.sheet) {

            if (this.isIdle()) {
                const sprite = (this.heading > 0) ? 'idle-right' : 'idle-left'

                this.sheet.drawSprite(g, sprite, this.position.x, this.position.y)

                return
            }

            this.sheet.drawAnimation(g, this.currentAnimation, this.position.x, this.position.y)
        }
    }

    async loadSprites ()
    {
        this.sheet = await loadSpriteSheet('mario')
    }

    setCurrentAnimation ()
    {
        if (this.isIdle())
            this.currentAnimation = null

        //Pressing right
        if (this.isPressingRight()) {

            //Turning around
            if (this.velocity.x < 0) this.currentAnimation = 'dash-right'

            //Running Moderate
            else if (this.isRunningModerate()) this.currentAnimation = 'run-right'

            //Running fast
            else if (this.isRunningFast()) this.currentAnimation = 'run-fast-right'
        }

        //Pressing left
        else if (this.isPressingLeft()) {

            //Turning around
            if (this.velocity.x > 0) this.currentAnimation = 'dash-left'

            //Running Moderate
            else if (this.isRunningModerate()) this.currentAnimation = 'run-left'

            //Running fast
            else if (this.isRunningFast()) this.currentAnimation = 'run-fast-left'
        }

        //Pressing none or both
        else {
            //Desacelerating
            if (this.velocity.x > 0) this.currentAnimation = 'run-right'
            
            else if (this.velocity.x < 0) this.currentAnimation = 'run-left'
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
            absoluteVelocityX < this.run.fastSpeed
        )
    }

    isRunningFast ()
    {
        const absoluteVelocityX = Math.abs(this.velocity.x)
        return (
            absoluteVelocityX > 0 & 
            absoluteVelocityX > this.run.fastSpeed)
    }
}