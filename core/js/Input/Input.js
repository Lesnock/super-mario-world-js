export default class Input
{
    constructor (controller)
    {
        this.controller = controller
    }

    update (dt)
    {
        this.controller.update()
    }
}