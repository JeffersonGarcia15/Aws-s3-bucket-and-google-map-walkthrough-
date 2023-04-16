"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Transactions", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			reservationId: {
				type: Sequelize.INTEGER,
			},
			transactionId: {
				type: Sequelize.STRING,
			},
			amount: {
				type: Sequelize.DECIMAL,
			},
			currency: {
				type: Sequelize.STRING,
			},
			paymentStatus: {
				type: Sequelize.STRING,
			},
			paymentTimeStamp: {
				type: Sequelize.DATE,
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
		return queryInterface.dropTable("Transactions");
	},
};
