//Mettre tous les modeles au meme endroit pour eviter des problemes avec les relations
import User from "./modeles/utilisateurs.js";
import Role from "./modeles/Roles.js";
import Cours from "./modeles/cours.js";
import Etudiants from "./modeles/etudiants.js";
import Faculte from "/Users/franciskanane/Downloads/projet1_2023/Modeles/faculte.js";
import Programme from "/Users/franciskanane/Downloads/projet1_2023/Modeles/programme.js";


//Les relations entre les modeles

User.hasOne(Etudiants, { foreignKey: 'id_utilisateur' });
User.hasMany(Cours, { foreignKey: 'id_professeur' });
Etudiants.belongsTo(User, { foreignKey: 'id_utilisateur' });
Etudiants.belongsTo(Role, { foreignKey: 'id_role' });
Cours.belongsTo(User, { foreignKey: 'id_professeur' });

Faculte.hasMany(Cours, { foreignKey: 'id_faculte' });
Cours.belongsTo(Faculte, { foreignKey: 'id_faculte' });



export { User, Role, Cours, Etudiants, Faculte, Programme };
