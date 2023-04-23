"use strict";
const dotenv = require("dotenv");

if (process.env.NODE_ENV === "development") {
	dotenv.config({ path: ".env.development.local" });
} else {
	dotenv.config();
}
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			username: {
				type: Sequelize.STRING(30),
				allowNull: false,
				unique: true,
			},
			firstName: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			biography: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			profileImageUrl: {
				type: Sequelize.TEXT,
				allowNull: true,
				defaultValue: process.env.DEFAULT_PROFILE_IMAGE_URL,
			},
			isSuperHost: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			email: {
				type: Sequelize.STRING(256),
				allowNull: false,
				unique: true,
			},
			hashedPassword: {
				type: Sequelize.STRING.BINARY,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Users");
	},
};
