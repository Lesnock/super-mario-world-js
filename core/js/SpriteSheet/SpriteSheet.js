import Tile from './Tile.js'
import Sprite from './Sprite.js';
import Animation from './Animation.js';
import {createBuffer} from '../Display/Display.js'

export default class SpriteSheet
{
    constructor (image)
    {
        this.image = image
        this.tiles = new Map()
        this.sprites = new Map()
        this.animations = new Map()
    }

    async defineTile (id, x, y, width, height, collider)
    {
        const buffer = createBuffer(width, height)

        buffer
            .getContext('2d')
            .drawImage(
                this.image,
                x, y, 
                width, height,
                0, 0, width, height
            )
        
        const tile = new Tile(buffer, x, y, width, height, collider)
        await tile.setCollider(collider)
        
        this.tiles.set(id, tile)
    }

    async defineSprite (name, x, y, width, height)
    {
        const buffer = createBuffer(width, height)

        buffer
            .getContext('2d')
            .drawImage(
                this.image,
                x, y, 
                width, height,
                0, 0, width, height
            )

        const sprite = new Sprite(buffer, x, y, width, height)
        this.sprites.set(name, sprite)
    }

    async defineAnimation (name, frames, loop)
    {
        const animation = new Animation(frames, loop)
        this.animations.set(name, animation)
    }

    drawTile (g, name, x, y)
    {
        const tile = this.tiles.get(name)
        g.drawImage(tile.buffer, x, y)
    }

    drawSprite (g, name, x, y)
    {
        const sprite = this.sprites.get(name)
        
        g.drawImage(sprite.buffer, x, y)
    }

    drawAnimation (g, name, x, y)
    {
        const animation = this.animations.get(name)

        this.drawSprite(g, animation.currentSprite, x, y)
    }

    runAnimation (name, gameObject = undefined) {
        const animation = this.animations.get(name)

        if (gameObject) {
            gameObject.currentSprite = animation.currentSprite
        }

        animation.update()
    }
}