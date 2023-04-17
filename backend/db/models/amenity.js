"use strict";
module.exports = (sequelize, DataTypes) => {
	const Amenity = sequelize.define(
		"Amenity",
		{
			title: DataTypes.STRING,
		},
		{}
	);
	Amenity.associate = function (models) {
		const AmenityColumnMapping = {
			through: "SpotAmenity",
			otherKey: "spotId",
			foreignKey: "amenityId",
			onDelete: "CASCADE",
		};
		Amenity.belongsToMany(models.Spot, AmenityColumnMapping);
	};

	return Amenity;
};
