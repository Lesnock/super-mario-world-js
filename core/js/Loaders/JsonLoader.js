import Assets from "../Assets";

export default function loadJSON(url) 
{
    if (Assets.json.has(url))
        return Assets.json.get(url)

    return fetch(url)
    .then(r => {
        const json =  r.json()

        Assets.json.set(url, json)
        return json
    })
}