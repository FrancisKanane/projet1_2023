//Importer la base de donnee pour creer les modeles
import database from "../connexion.js";
import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

//Modele de la table User
const User = database.define('User', {
    nom: { type: DataTypes.STRING, allowNull: false },
    prenom: { type: DataTypes.STRING, allowNull: false },
    courriel: { type: DataTypes.STRING, allowNull: false, unique: true },
    mot_de_passe: { type: DataTypes.STRING, allowNull: false },
    date_de_naissance: { type: DataTypes.DATE },
    adresse: { type: DataTypes.STRING },
    ville: { type: DataTypes.STRING },
    code_postal: { type: DataTypes.STRING(10) },
    telephone: { type: DataTypes.STRING(20) }
}, {
    //Ajouter cet objet pour ne pas avoir les colonnes createdAt and updatedAt automatiquement
    timestamps: false
});

// Hachage du mot de passe avant de sauvegarder l'utilisateur
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.mot_de_passe = await bcrypt.hash(user.mot_de_passe, salt);
});

User.beforeUpdate(async (user) => {
    if (user.changed('mot_de_passe')) {
        const salt = await bcrypt.genSalt(10);
        user.mot_de_passe = await bcrypt.hash(user.mot_de_passe, salt);
    }
});

export default User;
