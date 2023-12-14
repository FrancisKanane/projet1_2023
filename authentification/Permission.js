import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'v3ryC0mpl3x!AndL0ngS3cr3tK3y_Th@t1sH@rdToGuess1234';

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).send("Un token est requis pour l'accès");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send("Token invalide");
    }
};


