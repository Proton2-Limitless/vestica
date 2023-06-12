import { DataTypes, Model, UUIDV4 } from "sequelize"
import { sequelize } from "../../database"
import { INote } from "../../utilities"
import { User } from "../users"

interface NoteInstance extends Model<INote>, INote {}

export const Note = sequelize.define<NoteInstance>("Note", {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true,
    tableName: "Notes",
    modelName: "Note"
});

Note.hasOne(User, {
    foreignKey: "email",
    as: "owner"
});