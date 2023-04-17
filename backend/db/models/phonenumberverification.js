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
		PhoneNumberVerification.belongsTo(models.User, { foreignKey: "userId" });
		PhoneNumberVerification.hasOne(models.UserVerification, { foreignKey: "verificationMethodId" });
	};

	return PhoneNumberVerification;
};
