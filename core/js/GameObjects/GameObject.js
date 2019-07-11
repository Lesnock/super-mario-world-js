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
    }

    addComponent (component)
    {
        this.components.push(component)
    }

    superUpdate (dt)
    {
        this.position.addVector(this.velocity)
    }

    superRender (g)
    {
        this.components.forEach(component => {
            component.render(g)
        });
    }
}