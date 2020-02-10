import KeyboardController from "./Controllers/KeyboardController.js";

var instance = null

export default class Input
{
    controllers = [
        new KeyboardController(this)
    ]

    constructor ()
    {
        this.keys = {}
        this.press = new Map()
        this.release = new Map()
    }

    update (dt)
    {
        Input.up    = this.keys.up
        Input.down  = this.keys.down
        Input.right = this.keys.right
        Input.left  = this.keys.left
    }

    addPressMapping (key, callback)
    {
        this.press.set(key, callback)
        return this
    }

    addReleaseMapping (key, callback)
    {
        this.release.set(key, callback)
        return this
    }

    pressed (key, event)
    {
        if (! this.press.has(key))
            return

        this.press.get(key)(event)
    }

    released (key, event)
    {
        if (! this.release.has(key))
            return

        this.release.get(key)(event)
    }
}

//Singleton
Input.instance = () => {
    if (instance == null)
        instance = new Input()
        
    return instance
}