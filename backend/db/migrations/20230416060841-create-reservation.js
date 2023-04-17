"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Reservations", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			guestId: {
				type: Sequelize.INTEGER,
			},
			spotId: {
				type: Sequelize.INTEGER,
			},
			checkInDate: {
				type: Sequelize.DATE,
			},
			checkOutDate: {
				type: Sequelize.DATE,
			},
			numberOfGuests: {
				type: Sequelize.INTEGER,
			},
			totalPrice: {
				type: Sequelize.DECIMAL(10, 2),
			},
			reservationStatusId: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Reservations");
	},
};
