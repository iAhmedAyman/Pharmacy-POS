import jwt from 'jsonwebtoken';
import 'dotenv/config';

// userInfor -> {id, role}
function generateJWT(userInfo) {
    return jwt.sign(userInfo, process.env.JWTSECRET, { expiresIn: '8h' });
}

export default generateJWT;