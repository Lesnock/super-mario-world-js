export default class Display 
{
    constructor (title, width, height)
    {
        this.title = title
        this.width = width
        this.height = height

        this.setTitle(title)
        const canvas = this.createCanvas(width, height)
        document.body.appendChild(canvas)
    }

    setTitle (title)
    {
        document.title = title
    }

    createCanvas (width, height)
    {
        const canvas = document.createElement('canvas')

        canvas.id = 'display'
        canvas.width = width
        canvas.height = height

        canvas.style["image-rendering"] = "pixelated";

        return canvas
    }

    getGraphics ()
    {
        return document.getElementById('display').getContext('2d')
    }
}

export function createBuffer (width, height)
{
    const buffer = document.createElement('canvas')
    buffer.width = width
    buffer.height = height

    return buffer
}