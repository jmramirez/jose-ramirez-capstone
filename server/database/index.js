const Sequelize = require('sequelize')
const configFile = require('./config/config')
const models = require('./models')

const env = process.env.NODE_ENV || 'development'
const config = configFile[env]

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const db = {
    models: models(sequelize),
    sequelize,
}

module.exports = db