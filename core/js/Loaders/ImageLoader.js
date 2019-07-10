export default function loadImage (url)
{
    const image = new Image()

    return new Promise(resolve => {
        image.onload = () => {
            resolve(image)
        }

        image.src = url
    })
}