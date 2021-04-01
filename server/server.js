const express = require('express')
const path = require('path')
const helmet = require('helmet')
const compress = require('compression')
const cors = require('cors')
const services = require('./services')

const app = express()



app.use(helmet())
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "*.amazonaws.com"]
    }
}))

app.use(compress())
app.use(cors())

const serviceName = Object.keys(services);
for (let i = 0; i < serviceName.length; i +=1){
    const name = serviceName[i];
    if(name === 'graphql') {
        services[name].applyMiddleware({ app })
    }
    else {
        app.use(`/${name}`, services[name])
    }
}

app.get('*', (req,res) => {
    res.send('Welcome to PartAgile')
})

app.listen(8080, () => {
    console.log('Listening on port 8080')
})