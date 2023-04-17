"use strict";
module.exports = (sequelize, DataTypes) => {
	const Reservation = sequelize.define(
		"Reservation",
		{
			guestId: DataTypes.INTEGER,
			spotId: DataTypes.INTEGER,
			checkInDate: DataTypes.DATE,
			checkOutDate: DataTypes.DATE,
			numberOfGuests: DataTypes.INTEGER,
			totalPrice: DataTypes.DECIMAL(10, 2),
			reservationStatusId: DataTypes.INTEGER,
		},
		{}
	);
	Reservation.associate = function (models) {
		Reservation.belongsTo(models.User, { foreignKey: "guestId" });
		Reservation.belongsTo(models.Spot, { foreignKey: "spotId" });
		Reservation.hasOne(models.ReservationStatus, { foreignKey: "reservationStatusId" });
		Reservation.hasOne(models.Transaction, { foreignKey: "reservationId" });
	};

	return Reservation;
};
