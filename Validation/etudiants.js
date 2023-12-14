import { body,check } from "express-validator";

const etudiantsRules=[
    body('nom').notEmpty().withMessage('Le nom ne peut pas etre vide'),
]

export default etudiantsRules