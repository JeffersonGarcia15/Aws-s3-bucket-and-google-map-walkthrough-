const { sequelize } = require("./db/models");

module.exports = async () => {
	await sequelize.close();
};
