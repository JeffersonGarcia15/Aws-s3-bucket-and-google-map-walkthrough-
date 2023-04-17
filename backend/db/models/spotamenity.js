"use strict";
module.exports = (sequelize, DataTypes) => {
	const SpotAmenity = sequelize.define(
		"SpotAmenity",
		{
			spotId: DataTypes.INTEGER,
			amenityId: DataTypes.INTEGER,
		},
		{}
	);
	SpotAmenity.associate = function (models) {
		SpotAmenity.belongsTo(models.Spot, { foreignKey: "spotId" });
		SpotAmenity.belongsTo(models.Amenity, { foreignKey: "amenityId" });
	};

	return SpotAmenity;
};
