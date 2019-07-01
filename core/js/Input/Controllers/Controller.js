export default class Controller
{
    constructor ()
    {
        this.keys = {}
        this.setKeys()
        this.listen()
    }

    update (dt)
    {
        this.setKeys()
    }
}