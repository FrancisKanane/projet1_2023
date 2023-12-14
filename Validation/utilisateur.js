import { body,check } from "express-validator";

const userRules=[
    body('nom').notEmpty().withMessage('Le nom ne peut pas etre vide'),
]

export default userRules