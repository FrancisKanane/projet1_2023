import Programme from './modeles/programme.js';

export const addProgramme = async (req, res) => {
    const { titre, description, duree, frais } = req.body;
    try {
        const newProgramme = await Programme.create({ titre, description, duree, frais });
        res.status(201).json({ data: newProgramme, message: 'Programme créé avec succès.' });
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};

export const getProgramme = async (req, res) => {
    const { id } = req.params;
    try {
        const programme = await Programme.findByPk(id);
        if (!programme) {
            return res.status(404).json({ message: 'Programme non trouvé.' });
        }
        res.status(200).json({ data: programme });
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};

export const updateProgramme = async (req, res) => {
    const { id } = req.params;
    const { titre, description, duree, frais } = req.body;
    try {
        const programme = await Programme.findByPk(id);
        if (!programme) {
            return res.status(404).json({ message: 'Programme non trouvé.' });
        }
        await programme.update({ titre, description, duree, frais });
        res.status(200).json({ message: 'Programme mis à jour avec succès.' });
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};

export const deleteProgramme = async (req, res) => {
    const { id } = req.params;
    try {
        const programme = await Programme.findByPk(id);
        if (!programme) {
            return res.status(404).json({ message: 'Programme non trouvé.' });
        }
        await programme.destroy();
        res.status(200).json({ message: 'Programme supprimé avec succès.' });
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};
