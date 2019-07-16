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
        //this.deceleration = new Vector(0, 0)

        this.friction = 1
    }

    config ()
    {
        //
    }

    // accelerate (dt)
    // {
    //     this.velocity.x += this.acceleration.x * dt
    //     this.velocity.y += this.acceleration.y * dt
    // }

    decelerate (dt)
    {
        this.acceleration.x = 0
        
        const absoluteVelocityX = Math.abs(this.velocity.x)

        const deceleration = Math.min(absoluteVelocityX, this.break * dt)
        this.velocity.x += (this.velocity.x > 0) ? -deceleration : deceleration
    }

    superUpdate (dt)
    {
        this.components.forEach(component => {
            component.update(dt)
        });

        this.velocity.x += this.acceleration.x * dt
        this.velocity.y += this.acceleration.y * dt

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