// Importer la base de données pour créer les modèles
import database from "../connexion.js";
import { DataTypes } from 'sequelize';

// Modèle de la table Faculte
const Faculte = database.define('Faculte', {
    nom: { type: DataTypes.STRING, allowNull: false },
    localisation: { type: DataTypes.STRING(100), allowNull: false },
    nombre_departements: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT }
}, 
{
    // Ajouter cet objet pour ne pas avoir les colonnes createdAt et updatedAt automatiquement
    timestamps: false
});

export default Faculte;
