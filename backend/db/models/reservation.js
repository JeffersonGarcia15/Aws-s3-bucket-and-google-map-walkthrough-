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
			totalPrice: DataTypes.DECIMAL,
			reservationStatusId: DataTypes.INTEGER,
		},
		{}
	);
	Reservation.associate = function (models) {
		// associations can be defined here
	};

	return Reservation;
};
