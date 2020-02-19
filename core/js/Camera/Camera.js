import Vector from '../Math/Vector.js'

var instance = null

export default class Camera {
    constructor (xPosition = 0, yPosition = 0) {
        this.position = new Vector(xPosition, yPosition)
    }

    update (dt) {
        //
    }

    render (g) {
        //
    }

    // Singleton
    static instance() {
        if (instance == null)
            instance = new Camera()
            
        return instance
    }

    static get xPosition() {
        return instance.position.x
    }

    static get yPosition() {
        return instance.position.y
    }

    static setPosition(xPosition, yPosition) {
        instance.position.x = xPosition
        instance.position.y = yPosition
    }

    static setXPosition(xPosition) {
        instance.position.x = xPosition
    }

    static setYPosition(yPosition) {
        instance.position.y = yPosition
    }
}