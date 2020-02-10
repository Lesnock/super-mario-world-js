import GameObject from "./GameObject.js"

export default class Enemy extends GameObject
{
    constructor ()
    {
        super()
    }

    update (dt)
    {        
        //
    }

    render (g)
    {
        g.fillRect(this.position.x, this.position.y, 200, 200)
    }
}