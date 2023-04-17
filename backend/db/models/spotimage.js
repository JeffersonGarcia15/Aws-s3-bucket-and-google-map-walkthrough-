"use strict";
module.exports = (sequelize, DataTypes) => {
	const SpotImage = sequelize.define(
		"SpotImage",
		{
			spotId: DataTypes.INTEGER,
			imgUrl: DataTypes.TEXT,
		},
		{}
	);
	SpotImage.associate = function (models) {
		SpotImage.belongsTo(models.Spot, { foreignKey: "spotId" });
	};

	return SpotImage;
};
