import Vector from '../Math/Vector.js'

export default class Camera {
    constructor (xPosition = 0, yPosition = 0, width = 256, height = 200) {
        this.position = new Vector(xPosition, yPosition)
        this.velocity = new Vector(0, 0)

        this.width = width
        this.height = height
        this.debug = true

        if (this.debug) {
            this.controlWithMouse()
        }
    }

    centerOnObject(object) {
        if (this.debug) {
            // return
        }

        this.position.x = parseInt(object.position.x - this.width / 2)
        this.position.y = parseInt(object.position.y - this.height / 2)

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

    controlWithMouse() {
        let lastEvent = null;

        ['mousedown', 'mousemove'].forEach(eventName => {
            document.getElementById('display').addEventListener(eventName, event => {
                if (event.buttons === 2 
                && lastEvent 
                && lastEvent.buttons === 2 
                && lastEvent.type === 'mousemove') {
                    this.position.x -= event.offsetX - lastEvent.offsetX
                }

                lastEvent = event
            })
        })

        document.getElementById('display').addEventListener('contextmenu', event => {
            event.preventDefault()
        })
    }

    update(dt) {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
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