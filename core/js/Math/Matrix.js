export default class Matrix
{
    constructor ()
    {
        this.grid = []
    }

    forEach (callback)
    {
        
    }

    get (x, y)
    {
        if (this.grid[x])
            return this.grid[x][y]
        
        return undefined
    }

    set (x, y, value)
    {
        if (! this.grid[x])
            this.grid[x] = []

        this.grid[x][y] = value
    }

    has (x, y)
    {
        if (! this.grid[x])
            return false
        
        if (this.grid[x][y] == undefined)
            return false
        
        return true
    }
}