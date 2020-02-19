import Vector from '../Math/Vector.js'
import { getInstance } from '../InstanceManager.js'

export default class Camera {
    constructor (xPosition = 0, yPosition = 0, width = 480, height = 480) {
        this.position = new Vector(xPosition, yPosition)

        this.width = width
        this.height = height
    }

    centerOnObject(object) {
        const display = getInstance('Display')

        this.position.x = parseInt(object.position.x - display.width / 2)
        this.position.y = parseInt(object.position.y - display.height / 2)

        this.checkBlankSpace()
    }

    checkBlankSpace() {
        if (this.position.x < 0) {
            this.position.x = 0
        }

        if (this.position.y < 0) {
            this.position.y = 0
        }
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