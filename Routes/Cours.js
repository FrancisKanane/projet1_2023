import { Router } from "express";
import { addcours, getAllcours, updatecours, getcoursById, deletecours } from "../Controleurs/Cours.js";
import { verifyToken } from '/Users/franciskanane/Downloads/projet1_2023/authentification/Permission.js'; 

const router = Router();

router
    .get('/', getAllcours) // Cette route reste publique
    .get('/:id', getcoursById) // Cette route reste publique
    .post('/', verifyToken, addcours) // Protégée par le JWT
    .put('/:id', verifyToken, updatecours) // Protégée par le JWT
    .delete('/:id', verifyToken, deletecours) // Protégée par le JWT

export default router;
