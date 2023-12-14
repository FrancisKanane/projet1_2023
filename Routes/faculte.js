import { Router } from "express";

import { addFaculte, getAllFacultes, updateFaculte, getFaculteById, deleteFaculte } from "../Controleurs/faculte.js";

const router = Router();

router
    .get('/', getAllFacultes)
    .get('/:id', getFaculteById)
    .post('/', addFaculte)
    .put('/:id', updateFaculte)
    .delete('/:id', deleteFaculte);

export default router;
