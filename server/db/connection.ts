import config from './knexfile.js'
import knex from 'knex'

type Environment = 'production' | 'test' | 'development'
const environment = (process.env.NODE_ENV as Environment) || 'development'
const connection = knex.default(config[environment])

export default connection
