import Controller from "./Controller";

export default class KeyboardController extends Controller
{
    setKeys ()
    {
        this.up     = this.keys['KeyW']
        this.down   = this.keys['KeyS']
        this.right  = this.keys['KeyD']
        this.left   = this.keys['KeyA']
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