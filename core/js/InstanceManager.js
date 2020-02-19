var instances = new Map()

export function setInstance(name, instance) {
    instances.set(name, instance)
}

export function getInstance(name) {
    if (instances.has(name)) {
        return instances.get(name)
    }

    return null
}