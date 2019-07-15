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

                const dt = timer / 1000
                this.update(dt)
                this.render(g)
                timer = 0

            }

            requestAnimationFrame(loop)
        }

        loop()
    }
}