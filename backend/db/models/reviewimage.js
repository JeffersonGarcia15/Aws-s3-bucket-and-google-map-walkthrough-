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
		ReviewImage.belongsTo(models.Review, { foreignKey: "reviewId" });
	};

	return ReviewImage;
};
