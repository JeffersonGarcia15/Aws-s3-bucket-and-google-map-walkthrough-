const config = require("./index");

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

module.exports = {
	development: {
		username,
		password,
		database,
		host,
		dialect: "postgres",
		seederStorage: "sequelize",
	},
	production: {
		use_env_variable: "DATABASE_URL",
		dialect: "postgres",
		seederStorage: "sequelize",
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
	test: {
		username: process.env.DB_USER || username,
		password: process.env.DB_PASSWORD || password,
		database: process.env.DB_NAME || database,
		host: process.env.DB_HOST || host,
		dialect: "postgres",
		seederStorage: "sequelize",
	},
};
