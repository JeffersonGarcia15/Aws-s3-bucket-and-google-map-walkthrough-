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
		// associations can be defined here
	};

	return SpotImage;
};
