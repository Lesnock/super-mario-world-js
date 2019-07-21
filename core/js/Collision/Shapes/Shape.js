export default class Shape
{
    constructor (gameObject, x, y)
    {
        this.gameObject = gameObject
        this.x = x
        this.y = y
    }

    get xPosition ()
    {
        return this.gameObject.position.x + this.x
    }

    get yPosition ()
    {
        return this.gameObject.position.y + this.y
    }
}