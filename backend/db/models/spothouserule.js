"use strict";
module.exports = (sequelize, DataTypes) => {
	const SpotHouseRule = sequelize.define(
		"SpotHouseRule",
		{
			spotId: DataTypes.INTEGER,
			houseRuleId: DataTypes.INTEGER,
		},
		{}
	);
	SpotHouseRule.associate = function (models) {
		SpotHouseRule.belongsTo(models.Spot, { foreignKey: "spotId" });
		SpotHouseRule.belongsTo(models.HouseRule, { foreignKey: "houseRuleId" });
	};

	return SpotHouseRule;
};
