import { addetudiants, getAlletudiants, updateetudiants, getetudiantsById, deleteetudiants } from "../Controleurs/Etudiants.js"
import { Router } from "express";
import etudiantsRules from '../validations/etudiantsValidations.js'
import { verifyToken } from '/Users/franciskanane/Downloads/projet1_2023/authentification/Permission.js'; 

const router = Router()

router
    .get('/', getAlletudiants) // Cette route peut rester publique
    .post('/', etudiantsRules, verifyToken, addetudiants) // Protégée par le JWT
    .get('/:id', getetudiantsById) // Cette route peut rester publique ou être protégée, selon le besoin
    .put('/:id', verifyToken, updateetudiants) // Protégée par le JWT
    .delete('/:id', verifyToken, deleteetudiants) // Protégée par le JWT

export default router;
