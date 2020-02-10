import State from "./State.js"
import Assets from '../Assets.js'
import Level from '../Level/Level.js'
import Input from "../Input/Input.js"
import loadLevel from "../Loaders/LevelLoader.js"

export default class GameState extends State
{
    constructor ()
    {
        super()
    }

    async load ()
    {
        //This 'promise.all' method loads all the assets that 
        //it is necessary for the game, such as level, player, sprites, etc.
        return Promise.all([

            this.loadInput(),
            this.loadLevel('1'),
            //this.loadPlayer()

        ])
        .then(([
            //Resolved
            input,
            level, 
            //player

        ]) => {
            
            this.input = input
            this.level = level
            //this.player = player

            this.isReady = true
        })
    }

    update (dt)
    {
        this.input.update(dt)
        this.level.update(dt)
        // this.player.superUpdate(dt)

        // this.player.components.forEach(component => {
        //     component.update(dt)
        // });

        // this.player.update(dt)
    }

    render (g)
    {
        this.level.render(g)
        // for (let index = 0; index < 100; index++) {
        //     this.level.spritesheet.drawTile(g, 'ground', index * 16, 480)
        // }

        // this.player.superRender(g)
        // this.player.render(g)
    }

    loadInput ()
    {
        return Input.instance()
    }

    loadLevel (name)
    {
        return loadLevel(name)
    }

    loadPlayer ()
    {
        //return new Player()
    }
}