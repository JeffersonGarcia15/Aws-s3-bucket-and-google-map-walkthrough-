"use strict";
module.exports = (sequelize, DataTypes) => {
	const GovernmentIdVerification = sequelize.define(
		"GovernmentIdVerification",
		{
			userId: DataTypes.INTEGER,
			idNumber: DataTypes.INTEGER,
			idType: DataTypes.STRING,
			issuingCountry: DataTypes.STRING,
		},
		{}
	);
	GovernmentIdVerification.associate = function (models) {
		GovernmentIdVerification.belongsTo(models.User, { foreignKey: "userId" });
		GovernmentIdVerification.hasOne(models.UserVerification, {
			foreignKey: "verificationMethodId",
		});
	};

	return GovernmentIdVerification;
};
