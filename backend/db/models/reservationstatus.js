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
		ReservationStatus.belongsTo(models.Reservation, { foreignKey: "reservationStatusId" });
	};

	return ReservationStatus;
};
