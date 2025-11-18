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
      database: 'bike_facil_api'
    },
    migrations: {
      directory: path.join("./src/database/knex/migrations")
    }
  },
};

export default config