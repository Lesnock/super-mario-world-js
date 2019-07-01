//import SpriteLayer from '../Layers/SpriteLayer'
import Tile from './Tile'
import Sprite from './Sprite';
import Animation from './Animation';

export default class SpriteSheet
{
    constructor (image)
    {
        this.image = image
        this.sprites = new Map()
        this.animations = new Map()
    }

    defineSprite (name, x, y, width, height)
    {
        const sprite = new Sprite(x, y, width, height)
        this.sprites.set(name, sprite)
    }

    defineAnimation (name, frames, velocity)
    {
        const animation = new Animation(frames, velocity)
        this.animations.set(name, animation)
    }

    defineJSON (json)
    {
        if (! json.sprites)
            return

        const sprites = json.sprites
        
        Object.keys(sprites).forEach((key) => {
            this.defineSprite(key, ...sprites[key])
        })

        if (! json.animations)
            return

        const animations = json.animations

        Object.keys(animations).forEach((key) => {
            this.defineAnimation(key, animations[key].frames)
        })
    }

    drawSprite (g, name, x, y)
    {
        const sprite = this.sprites.get(name)
        
        g.drawImage(
            this.image,
            sprite.x, sprite.y, 
            sprite.width, sprite.height,
            x, y, sprite.width, sprite.height
        )
    }

    drawAnimation (g, name, x, y)
    {
        const animation = this.animations.get(name)

        this.drawSprite(g, animation.getCurrentSprite(), x, y)
    }
}