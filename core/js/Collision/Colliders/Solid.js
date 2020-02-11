import Collider from './Collider.js';

export default class Solid extends Collider {
    constructor() {
        super()

        this.friction = 1/5000
    }

    checkX(shape, match) {
        const gameObject = shape.gameObject

        // GameObject is going right
        if (gameObject.velocity.x > 0) {
            // If right side of the shape is more than the left side of the match
            if (shape.xPosition + shape.width > match.x1) {
                gameObject.obstructs('right')
                gameObject.position.x = match.x1 - shape.width - shape.x
                gameObject.velocity.x = 0
            }
        }

        // GameObject is going left
        else if (gameObject.velocity.x < 0) {
            // If left side of the shape is minus than the right side of the match
            if (gameObject.position.x < match.x2) {
                gameObject.obstructs('left')
                gameObject.position.x = match.x2 - shape.x
                gameObject.velocity.x = 0
            }

        }
    }

    checkY(shape, match) {
        const gameObject = shape.gameObject

        if (gameObject.velocity.y > 0) {

            if (shape.yPosition + shape.height > match.y1) {
                gameObject.obstructs('bottom')
                gameObject.position.y = match.y1 - shape.height - shape.y
                gameObject.velocity.y = 0

                //Add friction to velocity        
                this.addFriction(gameObject)
            }
        }

        else if (gameObject.velocity.y < 0) {
            if (gameObject.position.y < match.y2) {
                gameObject.obstructs('top')
                gameObject.position.y = match.y2
                gameObject.velocity.y = 0
            }
        }
    }

    addFriction(gameObject) {
        gameObject.velocity.x -= this.friction * gameObject.velocity.x * Math.abs(gameObject.velocity.x)
    }
}