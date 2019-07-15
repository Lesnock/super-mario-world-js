export default class Vector
{
    constructor (x, y)
    {
        this.x = x
        this.y = y
    }

    addVector (vector)
    {
        this.x += vector.x
        this.y += vector.y
    }

    multiplyBy (number)
    {
        this.x *= number
        this.y *= number
    }
}