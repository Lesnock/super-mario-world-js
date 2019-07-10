import Controller from "./Controller";

export default class KeyboardController extends Controller
{
    constructor (input)
    {
        super(input)
    }

    setKeys ()
    {
        this.input.up       = this.keys['KeyW']
        this.input.down     = this.keys['KeyS']
        this.input.right    = this.keys['KeyD']
        this.input.left     = this.keys['KeyA']
    }

    listen ()
    {
        window.addEventListener('keydown', (event) => {
            event.preventDefault()
            this.keys[event.code] = true
        })

        window.addEventListener('keyup', (event) => {
            event.preventDefault()

            this.keys[event.code] = false
        })
    }
}