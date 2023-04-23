const bcrypt = require("bcryptjs");

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

module.exports = {
	newUser,
};
