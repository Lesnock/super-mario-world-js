import GameObject from "./GameObject.js";

export default class Light extends GameObject {
    async init() {
        this.position.x = 100
        this.position.y = 200
        this.size = 40

        this.positions = []

        for (let times = 0; times < 10; times++) {

            const random1 = Math.floor(Math.random() * (256 - 0 + 1)) + 0;
            const random2 = Math.floor(Math.random() * (240 - random1 + 1)) + random1;

            this.positions.push({ random1, random2 })
        }        
    }

    update(dt) {
        // 
    }

    render(g) {
        g.globalCompositeOperation = 'overlay'

        g.lineWidth = 5
        g.strokeStyle = '#FFF'

        this.positions.forEach(({ random1, random2 }) => {
            g.beginPath()
            g.moveTo(random1, 0)
            g.lineTo(random2, 240)
            g.stroke()
        })        

        g.globalCompositeOperation = 'source-over'
    }
}