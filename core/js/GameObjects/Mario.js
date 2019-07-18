import Run from './Components/Run'
import Jump from './Components/Jump'
import GameObject from "./GameObject"
import RigidBody from './Components/RigidBody'
import loadSpriteSheet from '../Loaders/SpriteSheetLoader';
import Square from '../Collision/Shapes/Square';

export default class Mario extends GameObject
{
    components = [
        new Run(this),
        new RigidBody(this)
        //new Jump(this),
    ]

    shapes = [
        new Square(this, 0, 0, 18, 30)
    ]

    constructor ()
    {
        super()
    }

    async init ()
    {
        this.run.speed = 400
        this.run.break = 300

        this.run.fastSpeed = 200
        this.run.maxVelocity = 300

        this.position.y = 115

        this.friction = 1/50

        await this.loadSprites()
        this.run.setAnimationScript()
    }

    async loadSprites ()
    {
        this.sheet = await loadSpriteSheet('mario')
    }

    update (dt)
    {
        if (this.run.isIdle())
            return

        this.setCurrentAnimation()
        
        //Animation
        this.sheet.animations.get(this.currentAnimation).update()

        this.position.x = (this.velocity.x > 0) ? Math.ceil(this.position.x) : Math.floor(this.position.x)
        this.position.y = (this.velocity.y > 0) ? Math.ceil(this.position.y) : Math.floor(this.position.y)
    }

    render (g)
    {
        this.shapes.forEach(shape => {
            //shape.render(g)
        })

        if (this.run.isIdle()) {
            const sprite = (this.heading > 0) ? 'idle-right' : 'idle-left'

            this.sheet.drawSprite(g, sprite, this.position.x, this.position.y)

            return
        }

        this.sheet.drawAnimation(g, this.currentAnimation, this.position.x, this.position.y)
    }

    setCurrentAnimation ()
    {
        //Pressing right
        if (this.run.isPressingRight()) {

            //Turning around
            if (this.velocity.x < 0) this.currentAnimation = 'dash-right'

            //Running Moderate
            else if (this.run.isRunningModerate()) this.currentAnimation = 'run-right'

            //Running fast
            else if (this.run.isRunningFast()) this.currentAnimation = 'run-fast-right'
        }

        //Pressing left
        else if (this.run.isPressingLeft()) {

            //Turning around
            if (this.velocity.x > 0) this.currentAnimation = 'dash-left'

            //Running Moderate
            else if (this.run.isRunningModerate()) this.currentAnimation = 'run-left'

            //Running fast
            else if (this.run.isRunningFast()) this.currentAnimation = 'run-fast-left'
        }

        //Pressing none or both
        else {
            //Desacelerating
            if (this.velocity.x > 0) this.currentAnimation = 'run-right'
            
            else if (this.velocity.x < 0) this.currentAnimation = 'run-left'
        }
    }
}