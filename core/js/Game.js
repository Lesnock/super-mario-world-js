import State from './States/State';
import Display from './Display/Display'
import GameState from './States/GameState';

var display, 
    g

//States
var gameState, 
    menuState, 
    settingsState

export default class Game
{
    constructor (title, width, height)
    {
        display = new Display(title, width, height)
        g = display.getGraphics()
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
        if (State.getCurrentState() !== null) 
            gameState.update(deltaTime)
    }

    render (g)
    {
        g.clearRect(0, 0, display.width, display.height)
        
        if (State.getCurrentState() !== null)
            gameState.render(g)
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