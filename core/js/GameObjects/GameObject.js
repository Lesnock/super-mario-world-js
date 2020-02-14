import Point from "../Math/Point.js";
import Vector from "../Math/Vector.js";

export default class GameObject {
    components = []

    constructor() {
        this.position = new Point(0, 0)
        this.velocity = new Vector(0, 0)
        this.gravity = new Vector(0, 1000)

        this.friction = 1/5000
        this.direction = 0
        this.heading = 1
    }

    async init() {
        //
    }

    async superUpdate(dt) {
        //Add friction to velocity        
        this.velocity.x -= this.friction * this.velocity.x * Math.abs(this.velocity.x)

        this.components.forEach(component => {
            component.update(dt)
        });

        this.move(dt)
    }

    superRender(g) {
        this.components.forEach(component => {
            component.render(g)
        });
    }

    addAcceleration(dt) {
        //Add acceleration to velocity
        this.velocity.x += this.acceleration.x * dt
        this.velocity.y += this.acceleration.y * dt
    }

    addGravity(dt) {
        this.velocity.y += this.gravity.y * dt
    }

    move(dt) {
        if (Math.abs(this.velocity.x) > 0)
            this.moveX(dt)

        if (Math.abs(this.velocity.y) > 0)
            this.moveY(dt)
    }

    beforeMoveX(dt) {

    }

    moveX(dt) {
        this.beforeMoveX(dt)

        this.position.x += this.velocity.x * dt

        // Just allow position to be integers
        this.position.x = (this.velocity.x > 0)
            ? Math.ceil(this.position.x)
            : Math.floor(this.position.x)

        this.components.forEach(component => {
            component.onMoveX()
        })
    }

    beforeMoveY(dt) {
        
    }

    moveY(dt) {
        this.beforeMoveY(dt)

        this.position.y += this.velocity.y * dt

        // Just allow position to be integers
        this.position.y = (this.velocity.y > 0)
            ? Math.ceil(this.position.y)
            : Math.floor(this.position.y)

        this.components.forEach(component => {
            component.onMoveY()
        })
    }

    obstructs(side) {
        // Trigger obstructs function on components
        this.components.forEach(component => {
            component.obstructs(side)
        })
    }
}

GameObject.create = async function () {
    const _class = this
    const instance = new _class()

    instance.components.forEach(component => {
        instance[component.name] = component
    })

    await instance.init()

    return instance
}