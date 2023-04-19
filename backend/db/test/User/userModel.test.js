const { User } = require("../../models");
const bcrypt = require("bcryptjs");

require("dotenv").config();

describe("User Model", () => {
	beforeEach(async () => {
		await User.destroy({ where: {} });
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
});
