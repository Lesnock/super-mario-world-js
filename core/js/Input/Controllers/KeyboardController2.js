import Controller from "./Controller.js";

export default class KeyboardController extends Controller
{
    keys = {
        ArrowUp: 'up',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowDown: 'down',
    }

    constructor (input)
    {
        super(input)
    }

    listen ()
    {
        window.addEventListener('keydown', (event) => {
            event.preventDefault()

            const key = this.keys[event.code]

            // if (!this.input.press.has(key))
            //     return
            
            //Key is already active
            if (this.input.keys[key] !== true)
                this.input.pressed(key, event)
            
            this.input.keys[key] = true
        })

        window.addEventListener('keyup', (event) => {
            event.preventDefault()

            const key = this.keys[event.code]

            // if (! this.input.release.has(key))
            //     return

            this.input.keys[key] = false
            this.input.released(key, event)
        })
    }
}