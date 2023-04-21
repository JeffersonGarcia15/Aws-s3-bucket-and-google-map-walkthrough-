const SequelizeMock = require("sequelize-mock");

const dbMock = new SequelizeMock();

const User = dbMock.define("User", {
	id: 1,
	email: "test@example.com",
	username: "testuser",
	password: "hashedpassword",
	firstName: "testfirst",
	lastName: "testlast",
	biography: "testbiography",
	profileImageUrl: "https://universejf.s3.us-east-2.amazonaws.com/default-avatar.png",
	isSuperHost: false,
});

test("User model exists", () => {
	expect(User).toBeDefined();
});

test("User can be retrieved", async () => {
	const user = await User.findOne({ where: { id: 1 } });
	expect(user.get("id")).toEqual(1);
	expect(user.get("email")).toEqual("test@example.com");
	expect(user.get("username")).toEqual("testuser");
	expect(user.get("firstName")).toEqual("testfirst");
	expect(user.get("lastName")).toEqual("testlast");
	expect(user.get("biography")).toEqual("testbiography");
	expect(user.get("profileImageUrl")).toEqual(
		"https://universejf.s3.us-east-2.amazonaws.com/default-avatar.png"
	);
	expect(user.get("isSuperHost")).toEqual(false);
});
