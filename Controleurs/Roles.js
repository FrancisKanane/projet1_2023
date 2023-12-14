import { Role } from "../index.js"
import { validationResult } from "express-validator"

//Pour changer le nom des clefs par defaut dans l'erreur retournee
const myValidationResult = validationResult.withDefaults({
    formatter: error => {
    return {
        key: error.param,
        message:error.msg
    };
    },
});

// La liste de tous les Roles
export const getAllRoles = async (req, res) => {
    try {
        const result = await Role.findAll()
        res.status(200).json({ data: result, message: "Tous les Roles recus" })

    } catch (error) {
        res.status(404).json({ error: true, message: error.message })
    }
}

// Ajouter un Role
export const addRole = async (req, res) => {

    const { nom_role } = req.body
    const newRole = { nom_role }

    //Erreurs de validation
    const errors = validationResult(req) //Fonction par defaut
    // const errors = myValidationResult(req)  //Fonction modifiee
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })   
    }
    console.log("new errors",errors)

    try {
        const result = await Role.create(newRole)
        res.status(201).json({ data: result, message: 'Role cree avec succes' })
    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}

// Mettre a jour un Role
export const updateRole = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(404).json({ message: 'Le id du Role est obligatoire' })

    const { nom_role } = req.body
    const updatedRole = { nom_role }
    try {
        const result = await Role.update(updatedRole, { where: { id } })
        res.status(200).json({ message: 'Role updated' })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}

//Obtenir les infos d'un Role
export const getRoleById = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: 'id est obligatoire' })

    try {
        const result = await Role.findByPk(id)
        res.status(200).json({ data: result })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}



/*//Donner une note a un Role
export const createRoleNote = async (req, res) => {
    const RoleId = req.params.id
    if (!RoleId) res.status(404).json({ error: true, message: error.message })
    const { date, note } = req.body
    const newNote = { date, note }

    try {
        const currentRole = await Role.findByPk(RoleId)
        const result = await currentRole.createNote(newNote)
        res.status(201).json({ data: result, message: 'Note ajoutee' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


//Voir toutes les notes d'un Role
export const getRoleNotes = async (req, res) => {
    const RoleId = req.params.id
    if (!RoleId) res.status(404).json({ error: true, message: error.message })

    try {
        const currentRole = await Role.findByPk(RoleId)
        const result = await currentRole.getNotes()
        res.status(200).json({ data: result, message: 'Note retournee' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}*/

//Supprimer un Role
export const deleteRole = async (req, res) => {
    const RoleId = req.params.id
    if (!RoleId) return res.status(404).json({ error: true, message: error.message })

    try {
        const result = await Role.destroy({ where: { id: RoleId } })
        res.status(200).json({ data: result, message: 'Role supprime' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}