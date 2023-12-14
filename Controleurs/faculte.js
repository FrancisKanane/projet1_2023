import { faculte } from "../index.js";

// Ajouter une faculté
export const addFaculte = async (req, res) => {
    const { nom, localisation, nombre_departements, description } = req.body;
    const newFaculte = { nom, localisation, nombre_departements, description };

    try {
        const result = await faculte.create(newFaculte);
        res.status(201).json({ data: result, message: 'Faculté créée avec succès' });
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};

// Mettre à jour une faculté
export const updateFaculte = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: 'L\'id est obligatoire' });

    const { nom, localisation, nombre_departements, description } = req.body;
    const updatedFaculte = { nom, localisation, nombre_departements, description };
    try {
        const result = await faculte.update(updatedFaculte, { where: { id } });
        res.status(200).json({ message: 'Faculté modifiée avec succès' });
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};

// Obtenir les infos d'une faculté
export const getFaculteById = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: 'L\'id est obligatoire' });

    try {
        const result = await faculte.findByPk(id);
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};

// La liste de toutes les facultés
export const getAllFacultes = async (req, res) => {
    try {
        const result = await faculte.findAll();
        res.status(200).json({ data: result, message: "Toutes les facultés reçues" });
    } catch (error) {
        res.status(404).json({ error: true, message: error.message });
    }
};

// Supprimer une faculté
export const deleteFaculte = async (req, res) => {
    const faculteId = req.params.id;
    if (!faculteId) return res.status(404).json({ error: true, message: 'L\'id est obligatoire' });

    try {
        const result = await faculte.destroy({ where: { id: faculteId } });
        res.status(200).json({ data: result, message: 'Faculté supprimée' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
