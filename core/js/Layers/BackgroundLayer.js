import Container from '../Container.js'
import Tile from '../SpriteSheet/Tile.js'

export default class BackgroundLayer {
    constructor(color, image, { rows, columns }) {
        this.image = image
        this.color = color

        this.levelWidth = columns * Tile.defaultWidth
        this.levelHeight = rows * Tile.defaultHeight

        this.camera = Container.getModule('camera')
        this.display = Container.getModule('display')

        // Proportion of movement related to foreground
        // Makes "far illusion"
        this.movementProportion = 1/10

        this.buffer = this.createBackgroundBuffer()
    }

    update(dt) {
        // 
    }

    render(g) {
        const xPosition = Math.ceil(-this.camera.position.x * this.movementProportion)
        g.drawImage(this.buffer, xPosition, 0)
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