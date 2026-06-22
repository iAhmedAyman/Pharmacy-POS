import jwt from "jsonwebtoken";
import { verifyJWT } from "../utils/JWT.js";
import { search as userSearch } from "../services/user.service.js";

const verifyToken = async (req,res,next)=>{
    try {
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: 'error', message: 'Token missing or malformed' });
        }
        const token = authHeader.split(' ')[1]; // Get token that is after 'Bearer'

        if(!token) return res.status(401).json({ status: 'error', message: 'Unauthenticated' });
        
        let currentUser = verifyJWT(token);

        req.role = currentUser.role;
        req.userId = currentUser.id;

        next()
    } catch (error) {
        console.log('Unable to verify token');
        return res.status(401).json({ status: 'error', message: 'Invalid or expired token' });
    }
}

export default verifyToken;
