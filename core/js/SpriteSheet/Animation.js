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

        this.playing = true
        this.scripts = []
    }    

    update ()
    {
        if (!this.playing) 
            return

        this.scripts.forEach(callback => {
            callback(this)
        })

        this.timer += Date.now() - this.lastTime
        this.lastTime = Date.now()

        const frameSpeed = this.frames[this.index].speed

        if (this.timer >= frameSpeed) {

            this.index++
            this.timer = 0

            if (this.index >= this.size) {

                if (!this.loop) {
                    this.index = this.size - 1
                    this.playing = false
                    return
                }

                this.index = 0
            }
        }
    }

    get currentSprite ()
    {
        return this.frames[this.index].sprite
    }

    get nextIndex ()
    {
        if (this.frames[this.index + 1])
            return this.index + 1
        else
            return 0
    }

    get earlierIndex ()
    {
        if ((this.index - 1) < 0)
            return this.size - 1
        else
            return this.index - 1
    }

    get nextSprite ()
    {
        return this.frames[this.nextIndex].sprite
    }

    get earlierSprite ()
    {
        return this.frames[this.earlierIndex].sprite
    }

    addScript (fn)
    {
        this.scripts.push(fn)
    }
}