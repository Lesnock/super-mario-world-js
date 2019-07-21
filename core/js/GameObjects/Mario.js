import Run from './Components/Run'
import Jump from './Components/Jump'
import GameObject from "./GameObject"
import RigidBody from './Components/RigidBody'
import Square from '../Collision/Shapes/Square';
import loadSpriteSheet from '../Loaders/SpriteSheetLoader';
import Input from '../Input/Input';

export default class Mario extends GameObject
{
    components = [
        new Run(this),
        new RigidBody(this),
        new Jump(this),
    ]

    shapes = [
        new Square(this, 0, 0, 16, 28),
    ]

    constructor ()
    {
        super()
        this.width = 14
        this.height = 29
    }

    async init ()
    {
        this.sheet = await loadSpriteSheet('mario')

        this.run.speed = 400
        this.run.break = 300

        this.run.fastSpeed = 200
        this.run.maxVelocity = 300

        this.position.y = 115

        this.friction.x = 1/50
        this.friction.y = 1/100
    }

    update (dt)
    {
        console.log(this.velocity.y)
        if (Input.up) {
            this.jump.start()
        }
        else {
            this.jump.cancel()
        }

        if (this.run.isIdle()) return

        this.setCurrentAnimation()
        
        this.updateAnimation()
    }

    render (g)
    {
        // this.shapes.forEach(shape => {
        //     shape.render(g)
        // })

        if (this.run.isIdle()) {
            const sprite = (this.heading > 0) ? 'idle-right' : 'idle-left'

            this.sheet.drawSprite(g, sprite, this.position.x, this.position.y)

            return
        }

        this.sheet.drawAnimation(g, this.currentAnimation, this.position.x, this.getPositionY())
    }

    updateAnimation ()
    {
        //Animation
        this.sheet.animations.get(this.currentAnimation).update()
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

    getPositionY ()
    {
        const currentFrame = this.sheet.animations.get(this.currentAnimation).currentSprite

        let yPosition = this.position.y

        if (currentFrame == 'run-right-1' || 
            currentFrame == 'run-fast-right-1' || 
            currentFrame == 'run-left-1' ||
            currentFrame == 'run-fast-left-1') 
        {            
            yPosition -= 1
        }

        return yPosition
    }
}