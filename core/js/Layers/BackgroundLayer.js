import Container from '../Container.js'

export default class BackgroundLayer {
    constructor(color, image) {
        this.image = image
        this.color = color

        this.camera = Container.getModule('camera')
        this.display = Container.getModule('display')

        this.buffer = this.createBackgroundBuffer()
    }

    update(dt) {
        // 
    }

    render(g) {
        g.drawImage(this.buffer, 0 - this.camera.position.x / 3, 0)
    }

    createBackgroundBuffer() {
        const levelWidth = Container.getModule('levelWidth')
        const levelHeight = Container.getModule('levelHeight')

        // Create buffer
        const buffer = document.createElement('canvas')
        buffer.width = levelWidth
        buffer.height = levelHeight

        const context = buffer.getContext('2d')

        // Background color
        context.fillStyle = this.color
        context.fillRect(0, 0, this.levelWidth, this.levelHeight)

        let xPosition = 0
        const yPosition = levelHeight - this.image.height

        do {
            context.drawImage(this.image, xPosition, yPosition)
            xPosition += this.image.width
        } while (xPosition < levelWidth)

        return buffer
    }
}