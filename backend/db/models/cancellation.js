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
		// associations can be defined here
	};

	return Cancellation;
};
