// Routes/programme.js

import { Router } from 'express';
import { addProgramme, getProgramme, updateProgramme, deleteProgramme } from './Controleurs/Programme.js';
import { verifyToken } from '/Users/franciskanane/Downloads/projet1_2023/authentification/Permission.js'; 

const router = Router();


router.post('/', verifyToken, addProgramme); // Protégée par le JWT
router.get('/:id', getProgramme); // Cette route peut rester publique ou être protégée, selon le besoin
router.put('/:id', verifyToken, updateProgramme); // Protégée par le JWT
router.delete('/:id', verifyToken, deleteProgramme); // Protégée par le JWT

export default router;
