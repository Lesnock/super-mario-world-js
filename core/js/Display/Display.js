export default class Display 
{
    constructor (title, width, height)
    {
        this.title = title
        this.width = width
        this.height = height

        this.setTitle(title)
        this.createCanvas(width, height)
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

        document.body.appendChild(canvas)        
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