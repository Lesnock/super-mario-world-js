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

        this.buffer = this.createBackgroundBuffer()
    }

    update(dt) {
        // 
    }

    render(g) {
        // context.drawImage(this.image, -this.camera.position.x / 3, yPosition)
        // context.drawImage(this.image, 0, 0, this.levelWidth, this.levelHeight)
        
        g.drawImage(this.buffer, 0 - this.camera.position.x / 3, 0)

    }

    createBackgroundBuffer() {
        const buffer = document.createElement('canvas')
        buffer.width = 1200 //this.levelWidth
        buffer.height = this.levelHeight

        const context = buffer.getContext('2d')

        // Background color
        context.fillStyle = this.color
        context.fillRect(0, 0, this.levelWidth, this.levelHeight)

        let xPosition = 0

        do {
            context.drawImage(this.image, xPosition, 0)
            xPosition += this.image.width
        } while (xPosition < this.levelWidth)

        return buffer
    }
}