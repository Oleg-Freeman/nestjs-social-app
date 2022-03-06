const env = process.env.NODE_ENV;

require('dotenv').config({ path: `./.${env}.env`, override: true });

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: ['build/common/**/*entity.js'],
  migrations: ['build/migrations/**/*.js'],
  subscribers: ['build/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'build/common/**/*entity.js',
    migrationsDir: 'build/migrations',
    subscribersDir: 'build/subscriber',
  },
};
