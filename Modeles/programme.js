// modeles/programme.js

import database from "../connexion.js";
import { DataTypes } from 'sequelize';

const Programme = database.define('Programme', {
    titre: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    duree: { type: DataTypes.INTEGER }, // Durée en mois, par exemple
    frais: { type: DataTypes.DECIMAL(10, 2) }
}, {
    timestamps: false
});

export default Programme;
