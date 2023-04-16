"use strict";
module.exports = (sequelize, DataTypes) => {
	const UserVerification = sequelize.define(
		"UserVerification",
		{
			userId: DataTypes.INTEGER,
			isVerified: DataTypes.BOOLEAN,
			verificationMethodId: DataTypes.INTEGER,
			verificationDataId: DataTypes.INTEGER,
		},
		{}
	);
	UserVerification.associate = function (models) {
		// associations can be defined here
	};

	return UserVerification;
};
