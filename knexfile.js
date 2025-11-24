// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

import path from 'node:path'

const config = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'controle_estoque_api'
    },
    migrations: {
      directory: path.join("./src/database/knex/migrations")
    }
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DB_URL,
      ssl: { rejectUnauthorized: false }
    }
  }
};

export default config