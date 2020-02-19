import Game from '../Game.js'
import Vector from '../Math/Vector.js'

var instance = null

export default class Camera {
    constructor (xPosition = 0, yPosition = 0) {
        this.position = new Vector(xPosition, yPosition)
        instance = this
    }

    centerOnObject(object) {
        const display = Game.getDisplay()

        this.position.x = parseInt(object.position.x - display.width/2)
    }

    // Singleton
    static instance() {
        if (instance == null)
            instance = new Camera(0, 0)
            
        return instance
    }

    static getPosition() {
        return instance.position
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