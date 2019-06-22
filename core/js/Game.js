import Display from './Display/Display'
import {loadImage} from './Loaders/ImageLoader'

//Private Variables
var graphics

export default class Game
{
    constructor (title, width, height)
    {
        this.display = new Display(title, width, height)
        graphics = this.display.graphics
    }

    start ()
    {
        this.run()
    }

    update (deltaTime)
    {
        
    }

    render ()
    {
        graphics.clearRect(0, 0, this.display.width, this.display.height)
        graphics.fillRect(0, 0, 60, 60)

        
        graphics.drawImage(image, 64, 64)

        // BackgroundLayer.render()
        // SpriterLayer.render()

    }

    run ()
    {
        const fps = 30
        const timePerMoment = 1000 / fps
        let delta = 0
        let now
        let lastTime = Date.now()
        let timer = 0

        function loop (game)
        {
            now = Date.now()
            delta = now - lastTime
            timer += delta
            lastTime = now

            if (timer >= timePerMoment) {
                game.update(delta / 1000)
                game.render()
                timer = 0
            }

            requestAnimationFrame(() => loop(game))
        }
        loop(this)
    }
}