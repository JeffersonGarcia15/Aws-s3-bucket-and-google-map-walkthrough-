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
		// associations can be defined here
	};

	return HouseRule;
};
