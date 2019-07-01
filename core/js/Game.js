import Display from './Display/Display'
import Player from './GameObjects/Player';

var caio = 'caio'

//Private Variables
var graphics

export default class Game
{
    constructor (title, width, height)
    {
        this.display = new Display(title, width, height)
        graphics = this.display.graphics

        this.player = new Player()
    }

    start ()
    {
        this.run()
    }

    update (deltaTime)
    {
        this.player.superUpdate(deltaTime)
        this.player.update(deltaTime)
    }

    render (g)
    {
        g.clearRect(0, 0, this.display.width, this.display.height)
        //graphics.fillRect(0, 0, 60, 60)
        this.player.superRender(g)
        this.player.render(g)

        // sheet.defineAnimation('running', [
        //     'run1', 'run2', 'run3'
        // ])

        // sheet.drawAnimation(graphics, 'test', 200, 200)

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

        const loop = () => {
            now = Date.now()
            delta = now - lastTime
            timer += delta
            lastTime = now

            if (timer >= timePerMoment) {
                this.update(delta / 1000)
                this.render(graphics)
                timer = 0
            }

            requestAnimationFrame(loop)
        }

        loop()
    }
}