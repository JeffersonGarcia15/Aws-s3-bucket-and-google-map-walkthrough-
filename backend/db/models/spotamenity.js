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
		// associations can be defined here
	};

	return SpotAmenity;
};
