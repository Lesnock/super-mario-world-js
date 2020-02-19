import Shape from "./Shape.js";
import Camera from '../../Camera/Camera.js'

export default class Square extends Shape
{
    constructor (gameObject, x, y, width, height)
    {
        super(gameObject, x, y)
        this.width = width
        this.height = height
    }

    render (g)
    {
        g.strokeStyle = 'red'
            g.beginPath()
            g.rect(
                this.gameObject.position.x + this.x - Camera.xPosition,
                this.gameObject.position.y + this.y - Camera.yPosition,
                this.width, this.height)
            g.stroke()
    }
}