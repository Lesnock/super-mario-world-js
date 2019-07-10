import KeyboardController from "./Controllers/KeyboardController";

var instance = null

export default class Input
{
    controllers = [
        new KeyboardController(this)
    ]

    update (dt)
    {
        this.controllers.forEach(controller => {
            controller.update()
        })

        Input.up    = this.up
        Input.down  = this.down
        Input.right = this.right
        Input.left  = this.left
    }
}

//Singleton
Input.instance = () => {
    if (instance == null)
        instance = new Input()
        
    return instance
}