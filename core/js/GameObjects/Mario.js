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

        this.acceleration.x = 15
        this.friction = 0.9
        this.direction = 1

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
        if (this.direction > 0) {
            //Dash
            if (this.velocity.x < 0)
                this.currentAnimation = 'dash-right'
            else if (this.velocity.x > 0)
                this.currentAnimation = 'run-right'
            else
                this.currentAnimation = 'run-right'
        }

        else if (this.direction < 0) {
            //Dash
            if (this.velocity.x > 0)
                this.currentAnimation = 'dash-left'
            else
                this.currentAnimation = 'run-left'
        }

        else {
            this.currentAnimation = 'run-right'
        }
    }
}