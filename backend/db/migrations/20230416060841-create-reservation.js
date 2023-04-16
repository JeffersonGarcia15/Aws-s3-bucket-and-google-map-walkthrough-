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
			checkIndate: {
				type: Sequelize.DATE,
			},
			checkOutDate: {
				type: Sequelize.DATE,
			},
			numberOfGuests: {
				type: Sequelize.INTEGER,
			},
			totalPrice: {
				type: Sequelize.DECIMAL,
			},
			bookingStatusId: {
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
