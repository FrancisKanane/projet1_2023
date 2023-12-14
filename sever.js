import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import database from './connexion.js';

import userRoutes from './Routes/Utilisateur.js';
import roleRoutes from './Routes/Roles.js';
import coursRoutes from './Routes/Cours.js';
import etudiantsRoutes from './Routes/Etudiants.js';
import faculteRoutes from './Routes/faculte.js'; 
import programmeRoutes from './Routes/programme.js';

// Middleware pour la gestion des erreurs (Exemple simple)
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).send('Une erreur est survenue');
};

database.sync();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/cours', coursRoutes);
app.use('/etudiants', etudiantsRoutes);
app.use('/facultes', faculteRoutes); 
app.use('/programmes', programmeRoutes);

// Middleware pour la gestion des erreurs
app.use(errorHandler);

app.listen(PORT, () => console.log(`Serveur running on port ${PORT}`));
