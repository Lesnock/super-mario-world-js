export default class Point
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
}