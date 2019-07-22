import Controller from "./Controller";

export default class KeyboardController extends Controller
{
    keys = {
        KeyW: 'up',
        KeyA: 'left',
        KeyD: 'right',
        KeyS: 'down',
    }

    constructor (input)
    {
        super(input)
    }

    listen ()
    {
        window.addEventListener('keydown', (event) => {
            event.preventDefault()

            this.input.keys[this.keys[event.code]] = true
            this.input.pressed(this.keys[event.code], event)
        })

        window.addEventListener('keyup', (event) => {
            event.preventDefault()

            this.input.keys[this.keys[event.code]] = false
            this.input.released(this.keys[event.code], event)
        })
    }
}