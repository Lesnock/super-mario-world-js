import Tile from './Tile'
import Sprite from './Sprite';
import Animation from './Animation';
import {createBuffer} from '../Display/Display'

export default class SpriteSheet
{
    constructor (image)
    {
        this.image = image
        this.tiles = new Map()
        this.sprites = new Map()
        this.animations = new Map()
    }

    defineTile (name, x, y, width, height)
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
        
        const tile = new Tile(buffer, x, y, width, height)
        this.tiles.set(name, tile)
    }

    defineSprite (name, x, y, width, height)
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

    defineAnimation (name, frames, velocity)
    {
        const animation = new Animation(frames, velocity)
        this.animations.set(name, animation)
    }

    defineJSON (json)
    {
        this.defineJSONTiles(json)
        this.defineJSONSprites(json)
        this.defineJSONAnimations(json)
    }

    defineJSONTiles (json)
    {
        if (json.tiles) {
            const tiles = json.tiles
            
            Object.keys(tiles).forEach((key) => {
                this.defineTile(key, ...tiles[key])
            })
        }
    }

    defineJSONSprites (json)
    {
        if (json.sprites) {
            const sprites = json.sprites
            
            Object.keys(sprites).forEach((key) => {
                this.defineSprite(key, ...sprites[key])
            })
        }
    }

    defineJSONAnimations (json)
    {
        if (json.animations) {
            const animations = json.animations
            
            Object.keys(animations).forEach((key) => {
                this.defineAnimation(key, animations[key].frames)
            })
        }
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

        this.drawSprite(g, animation.getCurrentSprite(), x, y)
    }
}