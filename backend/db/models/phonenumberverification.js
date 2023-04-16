"use strict";
module.exports = (sequelize, DataTypes) => {
	const PhoneNumberVerification = sequelize.define(
		"PhoneNumberVerification",
		{
			userId: DataTypes.INTEGER,
			phoneNumber: DataTypes.STRING,
			carrier: DataTypes.STRING,
		},
		{}
	);
	PhoneNumberVerification.associate = function (models) {
		// associations can be defined here
	};

	return PhoneNumberVerification;
};
