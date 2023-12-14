import { cours } from "../index.js"

// Ajouter un cours
export const addcours = async (req, res) => {

    const { nom, description, niveau, instrument, date_debut, date_fin, capacite, frais} = req.body
    const newcours = { nom, description, niveau, instrument, date_debut, date_fin, capacite, frais }

    try {
        const result = await cours.create(newcours)
        res.status(201).json({ data: result, message: 'cours crée avec succès' })
    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}

// Mettre a jour un cours
export const updatecours = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(404).json({ message: 'Le id est obligatoire' })

    const { nom, description, niveau, instrument, date_debut, date_fin, capacite, frais} = req.body
    const updatedcours = {nom, description, niveau, instrument, date_debut, date_fin, capacite, frais}
    try {
        const result = await cours.update(updatedcours, { where: { id } })
        res.status(200).json({ message: 'cours modifiée avec succès' })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}

//Obtenir les infos d'un cours
export const getcoursById = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: 'Le id est obligatoire' })

    try {
        const result = await cours.findByPk(id)
        res.status(200).json({ data: result })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}

// La liste de tous les cours
export const getAllcours = async (req, res) => {
    try {
        const result = await cours.findAll()
        res.status(200).json({ data: result, message: "Toutes les cours reçues" })

    } catch (error) {
        res.status(404).json({ error: true, message: error.message })
    }
}

//Supprimer un cours
export const deletecours = async (req, res) => {
    const coursId = req.params.id
    if (!coursId) return res.status(404).json({ error: true, message: error.message })

    try {
        const result = await cours.destroy({ where: { id: coursId } })
        res.status(200).json({ data: result, message: 'cours supprimée' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}