"use strict";
module.exports = (sequelize, DataTypes) => {
	const Cancellation = sequelize.define(
		"Cancellation",
		{
			title: DataTypes.STRING,
		},
		{}
	);
	Cancellation.associate = function (models) {
		Cancellation.belongsTo(models.Spot, { foreignKey: "cancellationPolicyId" });
	};

	return Cancellation;
};
