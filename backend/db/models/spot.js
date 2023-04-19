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
			lat: DataTypes.DECIMAL(9, 6),
			lng: DataTypes.DECIMAL(9, 6),
			name: DataTypes.STRING,
			description: DataTypes.STRING,
			price: DataTypes.DECIMAL(10, 2),
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
		Spot.belongsTo(models.User, { foreignKey: "ownerId" });
		Spot.hasMany(models.Favorite, { foreignKey: "spotId" });
		const AmenityColumnMapping = {
			through: "SpotAmenity",
			otherKey: "amenityId",
			foreignKey: "spotId",
			onDelete: "CASCADE",
		};
		Spot.belongsToMany(models.Amenity, AmenityColumnMapping);
		const houseRulesColumnMapping = {
			through: "SpotHouseRule",
			otherKey: "houseRuleId",
			foreignKey: "spotId",
			onDelete: "CASCADE",
		};
		Spot.belongsToMany(models.HouseRule, houseRulesColumnMapping);
		Spot.hasMany(models.Reservation, { foreignKey: "spotId" });
		Spot.hasMany(models.SpotImage, { foreignKey: "spotId" });
		Spot.hasMany(models.Review, { foreignKey: "spotId" });
		Spot.hasOne(models.Cancellation, { foreignKey: "cancellationPolicyId" });
	};

	return Spot;
};
