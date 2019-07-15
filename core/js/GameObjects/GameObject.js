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

    config ()
    {
        //
    }

    accelerate ()
    {
        this.velocity.addVector(this.acceleration)
    }

    decelerate ()
    {
        this.velocity.x = (Math.abs(this.velocity.x) < this.friction) ? 0 : this.velocity.x * this.friction
    }

    superUpdate (dt)
    {
        this.components.forEach(component => {
            component.update(dt)
        });

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