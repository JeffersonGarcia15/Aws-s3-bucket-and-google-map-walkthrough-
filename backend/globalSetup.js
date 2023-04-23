const { sequelize } = require("./db/models");

module.exports = async () => {
	await sequelize.sync({ force: true });
};
