import { Sequelize } from "sequelize";
import { config } from "../configuration";

const sequelize = new Sequelize(config.SQL_URL, {
	dialect: "mysql",
	logging: false
});

export default sequelize;
