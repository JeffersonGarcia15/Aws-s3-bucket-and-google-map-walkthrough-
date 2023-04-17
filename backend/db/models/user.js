"use strict";
const { Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 30],
					isNotEmail(value) {
						if (Validator.isEmail(value)) {
							throw new Error("Cannot be an email.");
						}
					},
				},
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			biography: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			profileImageUrl: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: "https://universejf.s3.us-east-2.amazonaws.com/default-avatar.png",
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 256],
				},
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
			isSuperHost: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			defaultScope: {
				attributes: {
					exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
				},
			},
			scopes: {
				currentUser: {
					attributes: { exclude: ["hashedPassword"] },
				},
				loginUser: {
					attributes: {},
				},
			},
		}
	);

	User.prototype.toSafeObject = function () {
		// remember, this cannot be an arrow function
		const { id, username, email } = this; // context will be the User instance

		return { id, username, email };
	};

	User.prototype.validatePassword = function (password) {
		return bcrypt.compareSync(password, this.hashedPassword.toString());
	};

	User.getCurrentUserById = async function (id) {
		return await User.scope("currentUser").findByPk(id);
	};

	User.login = async function ({ credential, password }) {
		const { Op } = require("sequelize");
		const user = await User.scope("loginUser").findOne({
			where: {
				[Op.or]: {
					username: credential,
					email: credential,
				},
			},
		});
		if (user && user.validatePassword(password)) {
			return await User.scope("currentUser").findByPk(user.id);
		}
	};

	User.signup = async function ({ username, email, password }) {
		const hashedPassword = bcrypt.hashSync(password);
		const user = await User.create({
			username,
			email,
			hashedPassword,
		});

		return await User.scope("currentUser").findByPk(user.id);
	};

	User.associate = function (models) {
		User.hasMany(models.Spot, { foreignKey: "ownerId" });
		User.hasMany(models.Favorite, { foreignKey: "userId" });
		User.hasOne(models.GovernmentIdVerification, { foreignKey: "userId" });
		User.hasOne(models.PhoneNumberVerification, { foreignKey: "userId" });
		User.hasOne(models.UserVerification, { foreignKey: "userId" });
		User.hasMany(models.Message, { foreignKey: "senderId", as: "SentMessages" });
		User.hasMany(models.Message, { foreignKey: "receiverId", as: "ReceivedMessages" });
		User.hasMany(models.Reservation, { foreignKey: "guestId" });
		User.hasMany(models.Review, { foreignKey: "userId" });
	};

	return User;
};
