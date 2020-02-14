export default class Component
{
    constructor (gameObject)
    {
        this.gameObject = gameObject

        this.gameObject[this.name] = this
    }

    async update (dt)
    {
        //
    }

    async render (g)
    {
        //
    }

    obstructs (side)
    {
        //
    }

    onMoveX (dt) {

    }

    onMoveY (dt) {
        
    }
}