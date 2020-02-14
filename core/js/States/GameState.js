import State from "./State.js"
import Assets from '../Assets.js'
import Level from '../Level/Level.js'
import Input from "../Input/Input.js"
import loadLevel from "../Loaders/LevelLoader.js"

export default class GameState extends State {
    constructor() {
        super()
    }

    async load() {
        // This 'promise.all' method loads all the assets that 
        // it is necessary for the game, such as level, player, sprites, etc.
        return Promise.all([

            this.loadInput(),
            this.loadLevel('1'),

        ])
            .then(([
                //Resolved
                input,
                level,

            ]) => {

                this.input = input
                this.level = level

                this.isReady = true
            })
    }

    update(dt) {
        this.input.update(dt)
        this.level.update(dt)
    }

    render(g) {
        this.level.render(g)
    }

    loadInput() {
        return Input.instance()
    }

    loadLevel(name) {
        return loadLevel(name)
    }
}