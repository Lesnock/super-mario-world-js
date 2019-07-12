export default class Animation
{
    constructor (frames, loop = true)
    {
        this.frames = frames
        this.loop = loop
        this.size = frames.length

        this.index = 0
        this.lastTime = Date.now()
        this.timer = 0
    }    

    update ()
    {
        this.timer += Date.now() - this.lastTime
        this.lastTime = Date.now()

        const frameSpeed = this.frames[this.index].speed

        if (this.timer >= frameSpeed) {

            if (this.loop) {
                this.index++
                this.timer = 0

                if (this.index >= this.size)
                    this.index = 0
            }
            else {
                this.index = 0
            }
        }
    }

    getCurrentSprite ()
    {
        if (this.index !== false) {
            return this.frames[this.index].sprite
        }

        return false
    }
}