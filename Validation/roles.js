import { body,check } from "express-validator";

const roleRules=[
    body('nom_role').notEmpty().withMessage('Le nom ne peut pas etre vide')
]

export default roleRules