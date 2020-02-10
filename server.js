const express = require('express')
const path = require('path')

const port = 3000
const app = express()

app.use('/core', express.static('./core'))

app.get('/', (request, response) => {
    response.sendFile(path.resolve('./index.html'))
})

app.listen(port)