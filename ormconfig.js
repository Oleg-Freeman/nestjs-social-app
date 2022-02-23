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
  logging: false,
  entities: ['src/common/**/*entity.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/common/**/*entity.ts',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscriber',
  },
};
