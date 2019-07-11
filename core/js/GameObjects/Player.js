import Run from './Components/Run'
import Jump from './Components/Jump'
import GameObject from "./GameObject"
import RigidBody from './Components/RigidBody'
import loadSpriteSheet from '../Loaders/SpriteSheetLoader';

export default class Player extends GameObject
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
        this.maxVelocityX = 40

        this.direction = 1

        this.loadSprites()
    }

    update (dt)
    {        
        this.setCurrentAnimation()

        //Animation
        if (this.sheet) {
            //console.log(this.sheet.animations)
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
        this.sheet = await loadSpriteSheet('player')
    }

    setCurrentAnimation ()
    {
        if (this.direction > 0)
            this.currentAnimation = 'run-right'

        else if (this.direction < 0)
            this.currentAnimation = 'run-left'
    }
}