import Component from "./Component.js"
import Input from '../../Input/Input.js'

export default class Jump extends Component
{
    name = 'jump'
    
    constructor (gameObject)
    {
        super(gameObject)
        this.ready = false

        this.duration = 0.1
        this.speed = 60
        this.engageTime = 0
    }

    isFalling ()
    {
        return (! this.ready && this.gameObject.velocity.y < 0)
    }

    start ()
    {
        if (this.ready)
            this.engageTime = this.duration
    }

    cancel ()
    {
        this.engageTime = 0
    }

    update (dt)
    {
        if (this.engageTime > 0) {
            this.gameObject.velocity.y -= this.speed
            this.engageTime -= dt
        }

        this.ready = false
    }

    obstructs (side)
    {
        if (side === 'bottom') {
            this.ready = true
        }
    }
}