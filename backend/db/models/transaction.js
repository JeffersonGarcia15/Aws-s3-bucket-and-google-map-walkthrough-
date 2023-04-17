"use strict";
module.exports = (sequelize, DataTypes) => {
	const Transaction = sequelize.define(
		"Transaction",
		{
			reservationId: DataTypes.INTEGER,
			transactionId: DataTypes.STRING,
			amount: DataTypes.DECIMAL(10, 2),
			currency: DataTypes.STRING,
			paymentStatus: DataTypes.STRING,
			paymentTimeStamp: DataTypes.DATE,
		},
		{}
	);
	Transaction.associate = function (models) {
		Transaction.belongsTo(models.Reservation, { foreignKey: "reservationId" });
	};

	return Transaction;
};
