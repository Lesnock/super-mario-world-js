export default class Solid
{
    constructor (tile)
    {
        this.tile = tile
    }

    check (gameObject)
    {
        gameObject.velocity.x += 10
    }
}