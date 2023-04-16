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
		// associations can be defined here
	};

	return SpotHouseRule;
};
