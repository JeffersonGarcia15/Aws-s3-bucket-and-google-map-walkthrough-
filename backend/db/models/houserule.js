"use strict";
module.exports = (sequelize, DataTypes) => {
	const HouseRule = sequelize.define(
		"HouseRule",
		{
			rule: DataTypes.STRING,
		},
		{}
	);
	HouseRule.associate = function (models) {
		const houseRulesColumnMapping = {
			through: "SpotHouseRule",
			otherKey: "spotId",
			foreignKey: "houseRuleId",
			onDelete: "CASCADE",
		};
		HouseRule.belongsToMany(models.Spot, houseRulesColumnMapping);
	};

	return HouseRule;
};
