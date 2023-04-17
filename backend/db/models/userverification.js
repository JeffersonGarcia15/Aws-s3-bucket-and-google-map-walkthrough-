"use strict";
module.exports = (sequelize, DataTypes) => {
	const UserVerification = sequelize.define(
		"UserVerification",
		{
			userId: DataTypes.INTEGER,
			isVerified: DataTypes.BOOLEAN,
			verificationMethodId: DataTypes.INTEGER,
			verificationMethodType: DataTypes.STRING,
		},
		{}
	);
	UserVerification.associate = function (models) {
		UserVerification.belongsTo(models.User, { foreignKey: "userId" });
		UserVerification.belongsTo(models.GovernmentIdVerification, {
			foreignKey: "verificationMethodId",
		});
		UserVerification.belongsTo(models.PhoneNumberVerification, {
			foreignKey: "verificationMethodId",
		});
	};

	return UserVerification;
};
