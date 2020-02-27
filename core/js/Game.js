import State from './States/State.js'
import Container from './Container.js'
import Camera from './Camera/Camera.js'
import Display from './Display/Display.js'
import GameState from './States/GameState.js'

var display, g, camera

//States
var gameState, 
    menuState, 
    settingsState

export default class Game
{
    constructor (title, width, height)
    {
        display = new Display(title, width, height)
        
        camera = new Camera(0, 0, width, height)

        g = display.getGraphics()

        // Bind instances to container
        Container.bind({ display, camera, g })
    }

    /**
     * Start the game
     */
    async start ()
    {
        this.run()

        this.loadInitialState()
    }

    async loadInitialState ()
    {
        gameState = new GameState()
        await gameState.load()

        State.setCurrentState(gameState)
    }

    update (deltaTime)
    {
        if (State.getCurrentState() !== null) {
            Container.bind({ deltaTime })
            gameState.update(deltaTime)
        }

        camera.update(deltaTime)
    }

    render (g)
    {
        g.clearRect(0, 0, display.width, display.height)
        
        if (State.getCurrentState() !== null) {
            gameState.render(g)
        }

        camera.render(g)
    }

    run ()
    {
        const fps = 60
        let delta = 1 / fps
        let lastTime = 0
        let timer = 0
        let now

        const loop = () => {
            now = performance.now()
            timer += (now - lastTime) / 1000

            if (timer > 1) {
                timer = 1
            }

            while (timer > delta) {
                this.update(delta)
                this.render(g)

                timer -= delta
            }

            lastTime = now

            requestAnimationFrame(loop)
        }

        loop(0)
    }
}