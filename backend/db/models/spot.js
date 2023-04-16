"use strict";
module.exports = (sequelize, DataTypes) => {
	const Spot = sequelize.define(
		"Spot",
		{
			ownerId: DataTypes.INTEGER,
			address: DataTypes.STRING,
			city: DataTypes.STRING,
			state: DataTypes.STRING,
			country: DataTypes.STRING,
			lat: DataTypes.DECIMAL,
			lng: DataTypes.DECIMAL,
			name: DataTypes.STRING,
			description: DataTypes.STRING,
			price: DataTypes.DECIMAL,
			typeId: DataTypes.INTEGER,
			numberOfBedrooms: DataTypes.INTEGER,
			numberOfBathrooms: DataTypes.INTEGER,
			maxGuests: DataTypes.NUMBER,
			amenityId: DataTypes.INTEGER,
			houseRuleId: DataTypes.INTEGER,
			cancellationPolicyId: DataTypes.INTEGER,
			minimumNights: DataTypes.INTEGER,
		},
		{}
	);
	Spot.associate = function (models) {
		// associations can be defined here
	};

	return Spot;
};
