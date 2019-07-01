import Point from "../Math/Point";
import Vector from "../Math/Vector";

export default class GameObject
{
    constructor ()
    {
        this.position = new Point(0, 0)
        this.velocity = new Vector(0, 0)
        this.gravity = new Vector(0, 100)
    }

    superUpdate (dt)
    {
        this.position.addVector(this.velocity)
        this.position.addVector(this.gravity)
    }

    superRender (g)
    {
        
    }
}