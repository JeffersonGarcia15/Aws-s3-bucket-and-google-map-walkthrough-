"use strict";
module.exports = (sequelize, DataTypes) => {
	const ReservationStatus = sequelize.define(
		"ReservationStatus",
		{
			status: DataTypes.STRING,
		},
		{}
	);
	ReservationStatus.associate = function (models) {
		// associations can be defined here
	};

	return ReservationStatus;
};
