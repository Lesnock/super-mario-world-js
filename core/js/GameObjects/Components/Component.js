export default class Component
{
    constructor (gameObject)
    {
        this.gameObject = gameObject

        console.log(this)

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