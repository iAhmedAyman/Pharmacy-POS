import jwt from 'jsonwebtoken';
import 'dotenv/config';

// userInfor -> {id, role}
function generateJWT(userInfo) {
    return jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: '8h' });
}

function verifyJWT(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export {
    generateJWT,
    verifyJWT
}