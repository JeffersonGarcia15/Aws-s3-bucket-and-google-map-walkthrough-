const request = require("supertest");
const { User, sequelize } = require("../../../db/models");
const { newUser } = require("../../../utils/newUser");

const app = require("../../../app");

describe("POST(Log In)", () => {
	beforeEach(async () => {
		await User.create(newUser);
	});
	afterEach(async () => {
		await User.destroy({ where: { email: "jeff@aa.io" } });
	});
	afterAll(async () => {
		await sequelize.close();
	});

	test("throws an error for wrong credentials", async () => {
		expect.assertions(1);
		const response = await new Promise((resolve, reject) => {
			request(app)
				.post("/api/session")
				.send({ credential: "adilson", password: "adilson" })
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.expect(401)
				.end(function (err, res) {
					if (err) {
						reject(res);
					} else {
						resolve(res);
					}
				});
		});

		const errors = response.body.errors;
		expect(errors.credential).toEqual("The provided credentials were invalid.");
	});
	test("logs in user correctly", async () => {
		expect.assertions(3);
		const response = await new Promise((resolve, reject) => {
			request(app)
				.post("/api/session")
				.send({ credential: "JeffG4", password: "password" })
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						reject(res);
					} else {
						resolve(res);
					}
				});
		});

		const data = response._body;
		const user = data.user;
		expect(user.username).toEqual(newUser.username);
		expect(user.email).toEqual(newUser.email);
		expect(user.firstName).toEqual(newUser.firstName);
	});
});
