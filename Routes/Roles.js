import { addRole, getAllRoles, updateRole, getRoleById, deleteRole } from "../Controleurs/Roles.js";
import { Router } from "express";
import RoleRules from '../Validation/roles.js'

const router = Router()

router
    .get('/', getAllRoles)
    .post('/', RoleRules, addRole)
    .get('/:id', getRoleById)
    .put('/:id', updateRole)
    .delete('/:id', deleteRole)

export default router