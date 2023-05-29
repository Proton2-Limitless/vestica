import { DataTypes, Model, UUIDV4 } from "sequelize"
import sequelize from "../database"
import { INote } from "../utilities"

interface NoteInstance extends Model<INote>, INote {}

const Note = sequelize.define<NoteInstance>("Note", {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true
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

export default Note;