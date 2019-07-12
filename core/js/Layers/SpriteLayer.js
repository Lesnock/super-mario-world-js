export default class SpriteLayer
{
    constructor (objects)
    {
        this.objects = objects
    }

    update (dt)
    {
        this.objects.forEach(object => {
            object.superUpdate(dt)
            object.update(dt)
        })
    }

    render (g)
    {
        this.objects.forEach(object => {
            object.superRender(g)
            object.render(g)
        })
    }
}