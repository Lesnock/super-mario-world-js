import Shape from "./Shape.js";


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
                this.gameObject.position.x + this.x - this.gameObject.camera.position.x,
                this.gameObject.position.y + this.y - this.gameObject.camera.position.y,
                this.width, this.height)
            g.stroke()
    }
}