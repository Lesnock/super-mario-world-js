export default class SpriteLayer
{
    constructor (objects)
    {
        this.objects = objects
    }

    update (dt)
    {
        this.objects.forEach(object => {
            object.update(dt)
        })
    }

    render (g)
    {
        this.objects.forEach(object => {
            object.render(g)
        })
    }
}