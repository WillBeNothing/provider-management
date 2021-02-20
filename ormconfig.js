require('dotenv/config')


module.exports = {
    name: "default",
    type: "postgres",
    host: process.env.PG_HOST,
    port: 5432,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    migrations : [
        "./src/database/migrations/*.ts"
    ],
    entities: [
        "./src/app/models/*.ts"
    ],
    cli : {
        "migrationsDir": "./src/database/migrations"
    }
}
