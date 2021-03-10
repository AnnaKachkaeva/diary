const express = require('express')
const path = require('path')
const app = express()

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'index.html'))
})

const hostname = 'localhost'
const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log(`Server running at http://${hostname}:${PORT}/`)
})