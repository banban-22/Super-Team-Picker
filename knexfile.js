/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'super_team_picker',
    },
    migrations: {
      tableName: 'super_team_picker',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};
