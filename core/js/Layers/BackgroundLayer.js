import Container from '../Container.js'

export default class BackgroundLayer {
    constructor(color, image) {
        this.image = image
        this.color = color

        this.camera = Container.getModule('camera')
        this.display = Container.getModule('display')
    }

    update(dt) {
        // 
    }

    render(g) {
        const buffer = document.createElement('canvas')
        buffer.width = this.display.width
        buffer.height = this.display.height

        const context = buffer.getContext('2d')

        // Background color
        context.fillStyle = this.color
        context.fillRect(0,0, display.width, display.height)

        context.drawImage(this.image, -this.camera.position.x / 3, -this.camera.position.y)
        
        g.drawImage(buffer, 0, 0)

    }
}