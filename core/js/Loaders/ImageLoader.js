import Assets from "../Assets";

export default function loadImage (url)
{
    if (Assets.images.has(url))
        return Assets.images.get(url)

    const image = new Image()

    return new Promise(resolve => {
        image.onload = () => {
            Assets.images.set(url, image)
            resolve(image)
        }

        image.src = url
    })
}