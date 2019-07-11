export default class Component
{
    constructor (gameObject)
    {
        this.gameObject = gameObject

        this.gameObject[this.name] = this
    }

    update (dt)
    {
        //
    }

    render (g)
    {
        //
    }
}