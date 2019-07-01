import GameObject from "./GameObject"
import loadImage from '../Loaders/ImageLoader'
import SpriteSheet from '../SpriteSheet/SpriteSheet'

import Input from '../Input/Input'
import KeyboardController from '../Input/Controllers/KeyboardController'

import loadJSON from '../Loaders/JsonLoader'

export default class Player extends GameObject
{
    constructor ()
    {
        super()

        //this.velocity.y = 10

        this.setSprites()
        this.isRunningRight = true

        this.image = loadImage('./core/gfx/spritesheets/player.png')
        this.input = new Input(new KeyboardController())
    }

    update (dt)
    {
        //Animation
        if (this.sheet) {
            this.setCurrentAnimation()
            this.sheet.animations.get(this.currentAnimation).update()
        }

        //Input
        this.input.update(dt)

        //Up and Down
        if (this.input.controller.up) {
            this.velocity.y = -150
        }
        else if (this.input.controller.down) {
            this.velocity.y = 40
        }
        else {
            this.velocity.y = 0
        }

        //Left and Right
        if (this.input.controller.left) {
            this.velocity.x = -40
        }
        else if (this.input.controller.right) {
            this.velocity.x = 40
        }
        else {
            this.velocity.x = 0
        }

        if (this.position.y > 300)
            this.position.y = 300
    }

    render (g)
    {
        //wait for async json load
        if (this.sheet) {
            //this.sheet.draw(g, 'idle', this.position.x, this.position.y)
            this.sheet.drawAnimation(g, this.currentAnimation, this.position.x, this.position.y)
        }
    }

    async setSprites ()
    {
        const spriteJSON = await loadJSON('core/sprites/player.json')
        this.sheet = new SpriteSheet(this.image)
        
        this.sheet.defineJSON(spriteJSON)
    }

    setCurrentAnimation ()
    {
        if (this.isRunningRight)
            this.currentAnimation = 'run-right'
    }
}