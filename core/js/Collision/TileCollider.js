import TileResolver from "./TileResolver";

export default class TileCollider
{
    constructor (tileGrid)
    {
        this.resolver = new TileResolver(tileGrid)
    }

    check (gameObject)
    {
        return this.resolver.getByPosition(gameObject.position.x, gameObject.position.y)
    }
}