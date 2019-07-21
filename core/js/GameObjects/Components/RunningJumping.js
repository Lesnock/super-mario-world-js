import Component from "./Component";

export default class RunningJumping extends Component
{
    name = 'runningJumping'
    
    constructor (gameObject)
    {
        super(gameObject)        
    }

    onMoveX (dt)
    {        
        const currentAnimation = this.gameObject.sheet.animations.get(this.gameObject.currentAnimation)

        if (! currentAnimation)
            return

        const currentFrame = currentAnimation.currentSprite

        if (currentFrame == 'run-right-1' || 
            currentFrame == 'run-fast-right-1' || 
            currentFrame == 'run-left-1' ||
            currentFrame == 'run-fast-left-1') 
            {
                
                this.gameObject.position.y -= 1
            }
    }
}