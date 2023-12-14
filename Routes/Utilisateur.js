import { addUser, getAllUsers, updateUser, getUserById, deleteUser, createUserRole, getUserRole } from "../Controleurs/Utilisateur.js";
import { Router } from "express";
import UserRules from '../Validation/utilisateur.js';
import { verifyToken } from 'chemin_vers/authMiddleware'; // Assurez-vous que le chemin d'importation est correct

const router = Router();

router
    .get('/', verifyToken, getAllUsers) // Protégée par le JWT
    .get('/:id', verifyToken, getUserById) // Protégée par le JWT    
    .post('/', UserRules, addUser) // L'inscription peut rester publique
    .put('/:id', verifyToken, updateUser) // Protégée par le JWT
    .delete('/:id', verifyToken, deleteUser) // Protégée par le JWT
    .post('/:id/role', verifyToken, createUserRole) // Protégée par le JWT
    .get('/:id/role', verifyToken, getUserRole); // Protégée par le JWT

export default router;
