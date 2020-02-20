var modules = {}

// Contain all global services, instances, etc
const Container = {
    bind: function(_modules) {
        Object.keys(_modules).forEach(name => {
            modules[name] = _modules[name]
        })
    },
    modules: function() {
        return modules
    },
    getModule: function(name) {
        return modules[name]
    }
}

export default Container