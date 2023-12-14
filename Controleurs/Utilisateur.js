import { User } from '../index.js'
import bcrypt from 'bcryptjs'

// import dotenv from 'dotenv'
// const tokenSecret = dotenv.config().parsed.TOKEN_SECRET

export const userLogin = async (req, res) => {
    const { nomUsager, motDePasse } = req.body;
    if (nomUsager) {
        try {
            const user = await User.findOne({ where: { nomUsager } });

            if (!user) {
                return res.status(404).json({ message: "No such user exists" });
            }

            const verifymotDePasse = await bcrypt.compare(motDePasse, user.motDePasse);

            if (verifymotDePasse) {
                // La logique de création de token est gérée par permission.js
                res.status(200).json({ user });
            } else {
                res.status(401).json({ message: "Le mot de passe est incorrect" });
            }

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const result = await User.findAll({ include: 'Roles' })
        res.status(200).json({ data: result, message: "Tous les utilisateurs recus" })

    } catch (error) {
        res.status(404).json({ error: true, message: error.message })
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).json({ message: 'Id est obligatoire' })
    try {
        const result = await User.findByPk(id, { include: 'Roles' })
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const addUser = async (req, res) => {

    const { nom, prenom, telephone, courriel, date_de_naissance, adresse, ville, code_postal, motDePasse } = req.body

    //hachage du mot de passe
    const hashedmotDePasse = await bcrypt.hash(motDePasse, 10)

    const newUser = { nom, prenom, telephone, courriel, date_de_naissance, adresse, ville, code_postal, motDePasse: hashedmotDePasse }

    try {
        const result = await User.create(newUser)
        res.status(201).json({ data: result, message: 'Utilisateur cree avec succes' })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}

export const createUserRole = async (req, res) => {
    const userId = req.params.id
    if (!userId) res.status(404).json({ error: true, message: error.message })

    const { nom } = req.body
    const newRole = { nom }

    try {
        const currentUser = await User.findByPk(userId)
        const result = await currentUser.createRole(newRole)
        res.status(201).json({ data: result, message: 'Role ajoute' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getUserRole = async (req, res) => {
    const userId = req.params.id
    if (!userId) res.status(404).json({ error: true, message: error.message })


    try {
        const currentUser = await User.findByPk(userId)
        const result = await currentUser.getRoles()
        res.status(200).json({ data: result, message: 'Roles retournes' })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Supprimer un User
export const deleteUser = async (req, res) => {
    const UserId = req.params.id
    if (!UserId) return res.status(404).json({ error: true, message: error.message })

    try {
        const result = await User.destroy({ where: { id: UserId } })
        res.status(200).json({ data: result, message: 'User supprime' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Mettre a jour un User
export const updateUser = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(404).json({ message: 'Le id du User est obligatoire' })

    const { nom, prenom, date_de_naissance, adresse, ville, code_postal  } = req.body
    const updatedUser = { nom, prenom, date_de_naissance, adresse, ville, code_postal }
    try {
        const result = await User.update(updatedUser, { where: { id } })
        res.status(200).json({ message: 'User updated' })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}