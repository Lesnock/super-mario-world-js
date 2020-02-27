import Vector from '../Math/Vector.js'
import Container from '../Container.js'

export default class Camera {
    constructor (xPosition = 0, yPosition = 0, width = 256, height = 200) {
        this.position = new Vector(xPosition, yPosition)
        this.velocity = new Vector(0, 0)

        this.width = width
        this.height = height

        this.debug = false

        if (this.debug) {
            this.controlWithMouse()
        }
    }

    update(dt) {
        // 
    }

    render(g) {
        if (!this.debug) {
            return
        }

        g.strokeStyle = 'purple'
        g.beginPath()
        g.rect(
            0, 0,
            this.width, this.height)
        g.stroke()
    }

    centerOnObject(object) {
        if (this.debug) {
            return
        }

        this.position.x = parseInt(object.position.x - this.width / 2)
        this.position.y = parseInt(object.position.y - this.height / 2)

        this.checkBlankSpace()
    }

    checkBlankSpace() {
        const levelWidth = Container.getModule('levelWidth')
        const levelHeight = Container.getModule('levelHeight')

        // Left edge
        if (this.position.x < 0) {
            this.position.x = 0
        }

        // Right edge
        if (this.position.x + this.width > levelWidth) {
            this.position.x = levelWidth - this.width
        }

        // Top edge
        if (this.position.y < 0) {
            this.position.y = 0
        }

        // Bottom edge
        if (this.position.y + this.height > levelHeight) {
            this.position.y = levelHeight - this.height
        }
    }

    controlWithMouse() {
        let lastEvent = null;

        ['mousedown', 'mousemove'].forEach(eventName => {
            document.getElementById('display').addEventListener(eventName, event => {
                if (event.buttons === 2 
                && lastEvent 
                && lastEvent.buttons === 2 
                && lastEvent.type === 'mousemove') {
                    this.position.x -= event.offsetX - lastEvent.offsetX
                    this.position.y -= event.offsetY - lastEvent.offsetY
                }

                lastEvent = event
            })
        })

        document.getElementById('display').addEventListener('contextmenu', event => {
            event.preventDefault()
        })
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