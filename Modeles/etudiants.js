//Importer la base de donnee pour creer les modeles
import database from "../connexion.js";
import { DataTypes } from 'sequelize'

//Modele de la table etudiants
const etudiants = database.define('etudiants', {
    id_utilisateur: { type: DataTypes.INTEGER },
    niveau: { type: DataTypes.STRING(50) },
    instrument_prefere: { type: DataTypes.STRING(50) },
    date_inscription: { type: DataTypes.DATE },
    id_cours: { type: DataTypes.INTEGER },
    id_role: { type: DataTypes.INTEGER },
    id_professeur: { type: DataTypes.INTEGER }
},
    { //Ajouter cet objet pour ne pas avoir les colonnes createdAt and updatedAt automatiquement
        timestamps: false
    })


export default etudiants
