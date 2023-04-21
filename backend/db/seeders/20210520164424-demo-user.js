"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

if (process.env.NODE_ENV === "development") {
	dotenv.config({ path: ".env.development.local" });
} else {
	dotenv.config();
}

module.exports = {
	up: (queryInterface) => {
		const users = [];

		for (let i = 0; i < 10; i++) {
			const user = {
				username: faker.internet.userName(),
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				biography: i % 3 === 0 ? faker.lorem.paragraph() : null,
				profileImageUrl: i % 4 === 0 ? faker.image.avatar() : process.env.DEFAULT_PROFILE_IMAGE_URL,
				email: faker.internet.email(),
				hashedPassword: bcrypt.hashSync(`password${i}`),
				isSuperHost: i % 5 === 0,
			};
			users.push(user);
		}

		return queryInterface.bulkInsert("Users", users, {});
	},

	down: (queryInterface, Sequelize) => {
		const Op = Sequelize.Op;

		return queryInterface.bulkDelete("Users", null, {});
	},
};
