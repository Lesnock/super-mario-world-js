var currentState = null

export default class State
{
    constructor ()
    {
        this.isReady = false
    }

    update (dt)
    {
        //
    }

    render (g)
    {
        //
    }
}

//Static Methods
State.getCurrentState = () => currentState
State.setCurrentState = (state) => currentState = state