"use strict";
module.exports = (sequelize, DataTypes) => {
	const Transaction = sequelize.define(
		"Transaction",
		{
			reservationId: DataTypes.INTEGER,
			transactionId: DataTypes.STRING,
			amount: DataTypes.DECIMAL,
			currency: DataTypes.STRING,
			paymentStatus: DataTypes.STRING,
			paymentTimeStamp: DataTypes.DATE,
		},
		{}
	);
	Transaction.associate = function (models) {
		// associations can be defined here
	};

	return Transaction;
};
