import Component from './Component.js'

export default class Gravity extends Component {

    name = 'gravity'

    constructor(gameObject) {
        super(gameObject)

        this.acceleration = 900
    }

    update(dt) {
        this.gameObject.velocity.y += this.acceleration * dt
    }

    render (g) {

    }
}