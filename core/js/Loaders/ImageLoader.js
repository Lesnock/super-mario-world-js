export default function loadImage (url)
{
    const image = new Image()
    image.src = url

    return image
}