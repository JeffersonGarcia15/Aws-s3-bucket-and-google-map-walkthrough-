"use strict";
module.exports = (sequelize, DataTypes) => {
	const SpotCancellation = sequelize.define(
		"SpotCancellation",
		{
			spotId: DataTypes.INTEGER,
			cancellationId: DataTypes.INTEGER,
		},
		{}
	);
	SpotCancellation.associate = function (models) {
		// associations can be defined here
	};

	return SpotCancellation;
};
