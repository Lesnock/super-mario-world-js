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
        this.maxVelocityX = 40

        this.direction = 1

        this.position.y = 2

        this.loadSprites()
    }

    update (dt)
    {        
        this.setCurrentAnimation()

        //this.position.x += 

        if (this.position.x > 200)
            this.position.x = 0

        this.position.x += 4

        if (this.sheet) {
            if (this.sheet.animations.get('run-right').getCurrentSprite() == 'run-right-1')
                this.position.y = 1
            else 
                this.position.y = 2
            
            this.sheet.animations.get('run-right').update()
        }
    }

    render (g)
    {
        //wait for async json load
        if (this.sheet) {
            this.sheet.drawAnimation(g, 'run-right', this.position.x, this.position.y)
        }
    }

    async loadSprites ()
    {
        this.sheet = await loadSpriteSheet('mario')
    }

    setCurrentAnimation ()
    {
        this.currentAnimation = 'run-right'
    }
}