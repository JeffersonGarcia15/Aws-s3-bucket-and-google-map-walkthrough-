const dotenv = require("dotenv");

if (process.env.NODE_ENV === "development") {
	dotenv.config({ path: ".env.development.local" });
} else {
	dotenv.config();
}

const express = require("express");

const router = express.Router();
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const {
	singleMulterUpload,
	singlePublicFileUpload,
	singlePublicFileDelete,
	extractKeyFromUrl,
} = require("../../awsS3");

const validateLogin = [
	check("credential")
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage("Please provide a valid email or username."),
	check("password").exists({ checkFalsy: true }).withMessage("Please provide a password."),
	handleValidationErrors,
];

// Log in
router.post(
	"/",
	validateLogin,
	asyncHandler(async (req, res, next) => {
		const { credential, password } = req.body;

		const user = await User.login({ credential, password });

		if (!user) {
			const err = new Error("Login failed");
			err.status = 401;
			err.title = "Login failed";
			err.errors = { credential: "The provided credentials were invalid." };

			return next(err);
		}

		await setTokenCookie(res, user);

		return res.json({
			user,
		});
	})
);

// Log out
router.delete("/", (_req, res) => {
	res.clearCookie("token");

	return res.json({ message: "success" });
});

// Restore session user
router.get("/", restoreUser, (req, res) => {
	const { user } = req;
	if (user) {
		return res.json({
			user: user.toSafeObject(),
		});
	}

	return res.json({});
});

router.put("/update/:id", singleMulterUpload("image"), async (req, res) => {
	try {
		const id = parseInt(req.params.id, 10);
		const user = await User.findByPk(id);
		let profileImageUrl;
		if (req.file) {
			const keyToDelete = extractKeyFromUrl(user.profileImageUrl);
			await singlePublicFileDelete(keyToDelete);
			profileImageUrl = await singlePublicFileUpload(req.file);
		} else {
			profileImageUrl = user.profileImageUrl;
		}

		const updatedUser = await user.update({ ...req.body, profileImageUrl });

		return res.json({ user: updatedUser });
	} catch (error) {
		res.status(500).json({ error: { message: error.message } });
	}
});

router.delete("/delete/:id", singleMulterUpload("image"), async (req, res) => {
	try {
		const id = parseInt(req.params.id, 10);
		const user = await User.findByPk(id);
		if (process.env.DEFAULT_PROFILE_IMAGE_URL !== user.profileImageUrl) {
			const keyToDelete = extractKeyFromUrl(user.profileImageUrl);
			await singlePublicFileDelete(keyToDelete);
		}
		await user.destroy();
		res.json({ message: "Account successfully deleted" });
	} catch (error) {
		res.status(500).json({ error: { message: error.message } });
	}
});

module.exports = router;
