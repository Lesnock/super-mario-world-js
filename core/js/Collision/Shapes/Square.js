export default class Square
{
    constructor (gameObject, x, y, width, height)
    {
        this.gameObject = gameObject
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    render (g)
    {
        g.fillRect(
            this.gameObject.position.x + this.x, 
            this.gameObject.position.y + this.y, 
            this.width, this.height
        )
    }
}