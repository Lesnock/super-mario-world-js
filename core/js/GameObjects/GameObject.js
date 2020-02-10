import Point from "../Math/Point.js";
import Vector from "../Math/Vector.js";

export default class GameObject {
    components = []

    constructor() {
        this.position = new Point(0, 0)
        this.velocity = new Vector(0, 0)
        this.acceleration = new Vector(0, 0)
        this.gravity = new Vector(0, 1000)

        this.friction = new Vector(.1, 1)
        this.direction = 0
        this.heading = 1
    }

    async init() {
        //
    }

    async superUpdate(dt) {
        //Add friction to velocity        
        this.velocity.x = this.velocity.x - this.velocity.x * this.friction.x
        this.velocity.y = this.velocity.y - this.velocity.y * this.friction.y

        this.components.forEach(component => {
            component.update(dt)
        });

        //Add acceleration to velocity
        this.addAcceleration(dt)
        //this.addGravity(dt)

        if (Math.abs(this.velocity.x) < 1) {
            this.velocity.x = 0
        }

        this.move(dt)
        
        this.position.y = (this.velocity.y > 0) ? Math.ceil(this.position.y) : Math.floor(this.position.y)
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
        if (Math.abs(this.velocity.x) > 0) this.moveX(dt)

        if (Math.abs(this.velocity.y) > 0) this.moveY(dt)
    }

    moveX(dt) {
        this.position.x += this.velocity.x * dt

        this.position.x = (this.velocity.x > 0) 
            ? Math.ceil(this.position.x) 
            : Math.floor(this.position.x)

        this.components.forEach(component => {
            if (typeof component.onMoveX === 'function') {
                component.onMoveX()
            }
        })
    }

    moveY(dt) {
        this.position.y += this.velocity.y * dt

        this.components.forEach(component => {
            if (typeof component.onMoveY === 'function') {
                component.onMoveY()
            }
        })
    }

    obstructs(side) {
        this.components.forEach(component => {
            if (typeof component.obstructs === 'function') {
                component.obstructsside
            }
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