import { etudiants } from "../index.js"
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

// La liste de tous les etudiantss
export const getAlletudiants = async (req, res) => {
    try {
        const result = await etudiants.findAll()
        res.status(200).json({ data: result, message: "Tous les etudiantss recus" })

    } catch (error) {
        res.status(404).json({ error: true, message: error.message })
    }
}

// Ajouter un etudiants
export const addetudiants = async (req, res) => {

    const { nom, niveau, instrument_prefere, date_inscription} = req.body
    const newetudiants = { nom, niveau, instrument_prefere, date_inscription}

    //Erreurs de validation
    const errors = validationResult(req) //Fonction par defaut
    // const errors = myValidationResult(req)  //Fonction modifiee
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })   
    }
    console.log("new errors",errors)

    try {
        const result = await etudiants.create(newetudiants)
        res.status(201).json({ data: result, message: 'etudiants cree avec succes' })
    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}

// Mettre a jour un etudiants
export const updateetudiants = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(404).json({ message: 'Le id du etudiants est obligatoire' })

    const { nom, niveau, instrument_prefere, date_inscription } = req.body
    const updatedetudiants = {  nom, niveau, instrument_prefere, date_inscription }
    try {
        const result = await etudiants.update(updatedetudiants, { where: { id } })
        res.status(200).json({ message: 'etudiants updated' })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}

//Obtenir les infos d'un etudiants
export const getetudiantsById = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: 'id est obligatoire' })

    try {
        const result = await etudiants.findByPk(id)
        res.status(200).json({ data: result })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}



//Donner une note a un etudiants
export const createetudiantsNote = async (req, res) => {
    const etudiantsId = req.params.id
    if (!etudiantsId) res.status(404).json({ error: true, message: error.message })
    const { date, note } = req.body
    const newNote = { date, note }

    try {
        const currentetudiants = await etudiants.findByPk(etudiantsId)
        const result = await currentetudiants.createNote(newNote)
        res.status(201).json({ data: result, message: 'Note ajoutee' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


//Voir toutes les notes d'un etudiants
export const getetudiantsNotes = async (req, res) => {
    const etudiantsId = req.params.id
    if (!etudiantsId) res.status(404).json({ error: true, message: error.message })

    try {
        const currentetudiants = await etudiants.findByPk(etudiantsId)
        const result = await currentetudiants.getNotes()
        res.status(200).json({ data: result, message: 'Note retournee' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Supprimer un etudiants
export const deleteetudiants = async (req, res) => {
    const etudiantsId = req.params.id
    if (!etudiantsId) return res.status(404).json({ error: true, message: error.message })

    try {
        const result = await etudiants.destroy({ where: { id: etudiantsId } })
        res.status(200).json({ data: result, message: 'etudiants supprime' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}