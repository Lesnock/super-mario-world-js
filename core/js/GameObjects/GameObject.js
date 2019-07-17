import Point from "../Math/Point";
import Vector from "../Math/Vector";

export default class GameObject
{
    components = []

    constructor ()
    {
        this.position = new Point(0, 0)
        this.velocity = new Vector(0, 0)
        this.acceleration = new Vector(0, 0)

        this.friction = 1
    }

    async init () 
    {
        //
    }

    superUpdate (dt)
    {
        this.components.forEach(component => {
            component.update(dt)
        });

        //Add acceleration to velocity
        this.velocity.x += this.acceleration.x * dt
        this.velocity.y += this.acceleration.y * dt

        //Add friction to velocity
        if (this.friction < 1)
            this.velocity.x = this.velocity.x - this.velocity.x * this.friction

        //Add velocity to position
        this.position.x += this.velocity.x * dt
        this.position.y += this.velocity.y * dt
    }

    superRender (g)
    {
        this.components.forEach(component => {
            component.render(g)
        });
    }
}

GameObject.create = async function () 
{
    const _class = this
    const instance = new _class()

    instance.components.forEach(component => {
        instance[component.name] = component
    })

    await instance.init()

    return instance
}