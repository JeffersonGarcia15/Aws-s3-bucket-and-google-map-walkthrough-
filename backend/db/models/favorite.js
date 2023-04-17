"use strict";
module.exports = (sequelize, DataTypes) => {
	const Favorite = sequelize.define(
		"Favorite",
		{
			userId: DataTypes.INTEGER,
			spotId: DataTypes.INTEGER,
		},
		{}
	);
	Favorite.associate = function (models) {
		Favorite.belongsTo(models.User, { foreignKey: "userId" });
		Favorite.belongsTo(models.Spot, { foreignKey: "spotId" });
	};

	return Favorite;
};
