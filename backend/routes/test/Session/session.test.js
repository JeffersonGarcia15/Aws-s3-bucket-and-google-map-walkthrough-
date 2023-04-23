const request = require("supertest");
const { User, sequelize } = require("../../../db/models");
const { newUser } = require("../../../utils/newUser");
const path = require("path");

jest.mock("../../../awsS3"); // Mock the actual awsS3 module
jest.setTimeout(10000);
const app = require("../../../app");

afterAll(async () => {
	await sequelize.close();
});

describe("PUT(Update user)", () => {
	let user;
	beforeEach(async () => {
		user = await User.create(newUser);
	});

	afterEach(async () => {
		await User.destroy({ where: { email: "jeff@aa.io" } });
	});
	test("updates the user", async () => {
		const filePath = path.join(__dirname, "atom.jpg");
		const update = await new Promise((resolve, reject) => {
			request(app)
				.put(`/api/session/update/${user.id}`)
				.attach("image", filePath)
				.field("firstName", "Adilson")
				.field("lastName", "Lopez")
				.set("Accept", "application/json")
				.expect(200)
				.end(function (err, res) {
					if (err) {
						reject(res);
					} else {
						resolve(res);
					}
				});
		});
		const data = JSON.parse(update.res.text);
		expect(data.user.firstName).not.toEqual(user.firstName);
		expect(data.user.lastName).not.toEqual(user.lastName);
		expect(data.user.profileImageUrl).not.toEqual(user.profileImageUrl);
	});

	test("does not update the user when attaching something other than 'image' for filePath", async () => {
		const filePath = path.join(__dirname, "atom.jpg");
		const update = await new Promise((resolve, reject) => {
			request(app)
				.put(`/api/session/update/${user.id}`)
				.attach("other", filePath)
				.expect(500)
				.end(function (err, res) {
					if (err) {
						reject(res);
					} else {
						resolve(res);
					}
				});
		});
		const data = JSON.parse(update.res.text);
		expect(data.title).toEqual("Server Error");
		expect(data.stack.includes("MulterError")).toBeTruthy();
	});
});

describe("DELETE(delete a user)", () => {
	test("deletes a user", async () => {
		await User.create(newUser);
		const foundUser = await User.findOne({ where: { email: newUser.email } });

		expect(foundUser).not.toBeNull();
		expect(foundUser.username).toEqual(newUser.username);

		const deleteUser = await new Promise((resolve, reject) => {
			request(app)
				.delete(`/api/session/delete/${foundUser.id}`)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						reject(res);
					} else {
						resolve(res);
					}
				});
		});
		const data = JSON.parse(deleteUser.res.text);
		const recentlyDeleteUser = await User.findOne({ where: { email: newUser.email } });
		expect(data.message).toEqual("Account successfully deleted");
		expect(recentlyDeleteUser).toBeNull();
	});
});

describe("User routes with invalid AWS credentials", () => {
	let user;
	beforeEach(async () => {
		user = await User.create(newUser);
	});
	beforeAll(() => {
		process.env.MOCK_S3_ERROR = "true";
	});

	afterAll(() => {
		process.env.MOCK_S3_ERROR = "false";
	});

	test("throws error when trying to update user with invalid AWS credentials", async () => {
		const filePath = path.join(__dirname, "atom.jpg");
		const response = await request(app)
			.put(`/api/session/update/${user.id}`)
			.attach("image", filePath)
			.field("firstName", "Adilson")
			.field("lastName", "Lopez")
			.set("Accept", "application/json");

		expect(response.status).toEqual(500);
		expect(response.body.error.message).toEqual("AWS S3 upload failed");
	});
});
