const express = require('express')
const path = require('path')
const helmet = require('helmet')
const compress = require('compression')

const app = express()

app.get('*', (req,res) => {
    res.send('Welcome to PartAgile')
})

app.listen(8080, () => {
    console.log('Listening on port 8080')
})