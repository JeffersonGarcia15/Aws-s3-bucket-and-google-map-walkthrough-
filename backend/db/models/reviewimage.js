"use strict";
module.exports = (sequelize, DataTypes) => {
	const ReviewImage = sequelize.define(
		"ReviewImage",
		{
			reviewId: DataTypes.INTEGER,
			imgUrl: DataTypes.TEXT,
		},
		{}
	);
	ReviewImage.associate = function (models) {
		// associations can be defined here
	};

	return ReviewImage;
};
