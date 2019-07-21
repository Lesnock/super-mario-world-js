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
        this.gravity = new Vector(0, 1000)

        this.friction = new Vector(1, 1)
        this.direction = 0
        this.heading = 1
    }

    async init () 
    {
        //
    }

    async superUpdate (dt)
    {
        //Add friction to velocity
        if (this.friction.x < 1)
            this.velocity.x = this.velocity.x - this.velocity.x * this.friction.x

        if (this.friction.y < 1) 
            this.velocity.y = this.velocity.y - this.velocity.y * this.friction.y

        this.addAcceleration(dt)

        this.velocity.y += this.gravity.y * dt

        this.components.forEach(component => {
            component.update(dt)
        });

        this.move(dt)

        this.position.x = (this.velocity.x > 0) ? Math.ceil(this.position.x) : Math.floor(this.position.x)
        this.position.y = (this.velocity.y > 0) ? Math.ceil(this.position.y) : Math.floor(this.position.y)
    }

    superRender (g)
    {
        this.components.forEach(component => {
            component.render(g)
        });
    }

    addAcceleration (dt)
    {
        //Add acceleration to velocity
        this.velocity.x += this.acceleration.x * dt
        this.velocity.y += this.acceleration.y * dt
    }

    move (dt)
    {        
        if (Math.abs(this.velocity.x) > 0) this.moveX(dt)
        
        if (Math.abs(this.velocity.y) > 0) this.moveY(dt)
    }

    moveX (dt)
    {
        this.position.x += this.velocity.x * dt

        this.components.forEach(component => {
            if (typeof component.onMoveX === 'function') {
                component.onMoveX()
            }
        })
    }

    moveY (dt)
    {
        this.position.y += this.velocity.y * dt

        this.components.forEach(component => {
            if (typeof component.onMoveY === 'function') {
                component.onMoveY()
            }
        })
    }

    obstructs (side)
    {
        this.components.forEach(component => {
            component.obstructs(side)
        })
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