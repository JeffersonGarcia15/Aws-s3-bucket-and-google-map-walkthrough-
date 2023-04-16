"use strict";
module.exports = (sequelize, DataTypes) => {
	const Message = sequelize.define(
		"Message",
		{
			senderId: DataTypes.INTEGER,
			receiverId: DataTypes.INTEGER,
			content: DataTypes.TEXT,
		},
		{}
	);
	Message.associate = function (models) {
		// associations can be defined here
	};

	return Message;
};
