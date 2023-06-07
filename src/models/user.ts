import { DataTypes, Model, UUIDV4 } from "sequelize"
import sequelize from "../database"
import { IUser, UserRole } from "../utilities"
import Note from "./note";

interface UserInstance extends Model<IUser>, IUser {}

const User = sequelize.define<UserInstance>("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM(...Object.values(UserRole)),
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: "Users",
    modelName: "User"
});

// User.hasMany(Note, {
//     foreignKey: "email"
// });

export default User;