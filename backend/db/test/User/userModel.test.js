const { User, sequelize } = require("../../models");
const bcrypt = require("bcryptjs");

require("dotenv").config();

describe("User Model", () => {
	beforeEach(async () => {
		await User.destroy({ where: { email: "jeff@aa.io" } });
	});
	afterAll(async () => {
		await sequelize.close();
	});

	test("Create a user", async () => {
		const newUser = {
			username: "JeffG4",
			firstName: "Jefferson",
			lastName: "Garcia",
			biography: "Nothing interesting here.",
			profileImageUrl:
				"https://astrogram.s3.us-east-2.amazonaws.com/1df67db17a7f4dcd8510e01b7ac9366c.jpg",
			email: "jeff@aa.io",
			isSuperHost: true,
			password: "password",
			hashedPassword: bcrypt.hashSync("password"),
		};

		const user = await User.create(newUser);

		expect(user).toHaveProperty("id");
		expect(user.username).toEqual(newUser.username);
		expect(user.firstName).toEqual(newUser.firstName);
		expect(user.lastName).toEqual(newUser.lastName);
		expect(user.biography).toEqual(newUser.biography);
		expect(user.profileImageUrl).toEqual(newUser.profileImageUrl);
		expect(user.email).toEqual(newUser.email);
		expect(user.isSuperHost).toEqual(newUser.isSuperHost);
	});

	test("Get a user by email", async () => {
		const newUser = {
			username: "JeffG4",
			firstName: "Jefferson",
			lastName: "Garcia",
			biography: "Nothing interesting here.",
			profileImageUrl:
				"https://astrogram.s3.us-east-2.amazonaws.com/1df67db17a7f4dcd8510e01b7ac9366c.jpg",
			email: "jeff@aa.io",
			isSuperHost: true,
			password: "password",
			hashedPassword: bcrypt.hashSync("password"),
		};

		await User.create(newUser);
		const foundUser = await User.findOne({ where: { email: newUser.email } });

		expect(foundUser).not.toBeNull();
		expect(foundUser.username).toEqual(newUser.username);
	});

	test("Update a user", async () => {
		const newUser = {
			username: "JeffG4",
			firstName: "Jefferson",
			lastName: "Garcia",
			biography: "Nothing interesting here.",
			profileImageUrl:
				"https://astrogram.s3.us-east-2.amazonaws.com/1df67db17a7f4dcd8510e01b7ac9366c.jpg",
			email: "jeff@aa.io",
			isSuperHost: true,
			password: "password",
			hashedPassword: bcrypt.hashSync("password"),
		};

		await User.create(newUser);
		const foundUser = await User.findOne({ where: { email: newUser.email } });

		expect(foundUser).not.toBeNull();
		expect(foundUser.username).toEqual(newUser.username);

		const updatedUser = await foundUser.update({
			firstName: "Adilson",
			lastName: "Lopez",
		});
		expect(updatedUser.firstName).not.toEqual(newUser.firstName);
		expect(updatedUser.lastName).not.toEqual(newUser.firstName);
		expect(updatedUser.firstName).toEqual("Adilson");
		expect(updatedUser.lastName).toEqual("Lopez");
	});

	test("Delete a user", async () => {
		const newUser = {
			username: "JeffG4",
			firstName: "Jefferson",
			lastName: "Garcia",
			biography: "Nothing interesting here.",
			profileImageUrl:
				"https://astrogram.s3.us-east-2.amazonaws.com/1df67db17a7f4dcd8510e01b7ac9366c.jpg",
			email: "jeff@aa.io",
			isSuperHost: true,
			password: "password",
			hashedPassword: bcrypt.hashSync("password"),
		};

		await User.create(newUser);
		const foundUser = await User.findOne({ where: { email: newUser.email } });

		expect(foundUser).not.toBeNull();
		expect(foundUser.username).toEqual(newUser.username);

		await User.destroy({ where: { username: newUser.username } });

		const deletedUser = await User.findOne({ where: { email: newUser.email } });
		expect(deletedUser).toBeNull();
	});
});
