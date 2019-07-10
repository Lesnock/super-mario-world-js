export default class Controller
{
    constructor (input)
    {
        this.input = input
        this.keys = {}
        this.setKeys()
        this.listen()
    }

    update (dt)
    {
        this.setKeys()
    }

    listen ()
    {
        //
    }

    setKeys ()
    {
        //
    }
}