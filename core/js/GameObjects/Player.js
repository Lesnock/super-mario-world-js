import Run from './Components/Run'
import Jump from './Components/Jump'
import GameObject from "./GameObject"
import loadJSON from '../Loaders/JsonLoader'
import loadImage from '../Loaders/ImageLoader'
import RigidBody from './Components/RigidBody'
import SpriteSheet from '../SpriteSheet/SpriteSheet'

export default class Player extends GameObject
{
    components = [
        new Run(this),
        new Jump(this),
        new RigidBody(this)
    ]

    constructor ()
    {
        super()

        this.acceleration.x = 15
        this.maxVelocityX   = 40

        this.loadSprites()
    }

    update (dt)
    {
        //Animation
        if (this.sheet) {
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
        //sprites and animations
        const spriteJSON = await loadJSON('core/sprites/player.json')

        //spritesheet image
        this.image = await loadImage('./core/gfx/spritesheets/player.png')

        this.sheet = new SpriteSheet(this.image)        
        this.sheet.defineJSON(spriteJSON)
    }
}