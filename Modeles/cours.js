//Importer la base de donnee pour creer les modeles
import database from "../connexion.js";
import { DataTypes } from 'sequelize'

//Modele de la table Cours
const Cours = database.define('Cours', {
    nom: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    niveau: { type: DataTypes.STRING(50) },
    instrument: { type: DataTypes.STRING(50) },
    date_debut: { type: DataTypes.DATE },
    date_fin: { type: DataTypes.DATE },
    capacite: { type: DataTypes.INTEGER },
    frais: { type: DataTypes.DECIMAL(10, 2) }
},
    { //Ajouter cet objet pour ne pas avoir les colonnes createdAt and updatedAt automatiquement
        timestamps: false
    })


export default Cours
