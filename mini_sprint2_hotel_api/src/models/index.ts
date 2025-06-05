import sequelize from "../config/database";
import Hotel from "./Hotel";
import City from "./City";
import Region from "./Region";

const db = {
    sequelize,
    Hotel,
    City,
    Region
};

export default db;