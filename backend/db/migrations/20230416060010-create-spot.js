"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Spots", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			ownerId: {
				type: Sequelize.INTEGER,
			},
			address: {
				type: Sequelize.STRING,
			},
			city: {
				type: Sequelize.STRING,
			},
			state: {
				type: Sequelize.STRING,
			},
			country: {
				type: Sequelize.STRING,
			},
			lat: {
				type: Sequelize.DECIMAL,
			},
			lng: {
				type: Sequelize.DECIMAL,
			},
			name: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING,
			},
			price: {
				type: Sequelize.DECIMAL,
			},
			typeId: {
				type: Sequelize.INTEGER,
			},
			numberOfBedrooms: {
				type: Sequelize.INTEGER,
			},
			numberOfBathrooms: {
				type: Sequelize.INTEGER,
			},
			maxGuests: {
				type: Sequelize.NUMBER,
			},
			amenityId: {
				type: Sequelize.INTEGER,
			},
			houseRuleId: {
				type: Sequelize.INTEGER,
			},
			cancellationPolicyId: {
				type: Sequelize.INTEGER,
			},
			minimumNights: {
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
		return queryInterface.dropTable("Spots");
	},
};
