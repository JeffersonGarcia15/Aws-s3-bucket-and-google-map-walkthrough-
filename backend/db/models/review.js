"use strict";
module.exports = (sequelize, DataTypes) => {
	const Review = sequelize.define(
		"Review",
		{
			spotId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			message: DataTypes.TEXT,
			rating: DataTypes.INTEGER,
		},
		{}
	);
	Review.associate = function (models) {
		Review.hasMany(models.ReviewImage, { foreignKey: "reviewId" });
		Review.belongsTo(models.Spot, { foreignKey: "spotId" });
		Review.belongsTo(models.User, { foreignKey: "userId" });
	};

	return Review;
};
