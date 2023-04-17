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
		Message.belongsTo(models.User, { foreignKey: "senderId", as: "Sender" });
		Message.belongsTo(models.User, { foreignKey: "receiverId", as: "Receiver" });
	};

	return Message;
};
