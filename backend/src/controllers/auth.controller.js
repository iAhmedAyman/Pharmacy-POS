import * as userService from '../services/user.service'
import generateJWT from '../utils/JWT';
import bcrypt from 'bcryptjs'

const signUp = async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.bocy.password, 10);
        req.body.password = hashedPassword;

        // Create user using user service
        const user = await userService.create(req.body);

        delete user.password; // Don't send password to client

        // Generate Java Web Token
        const token = generateJWT({id: user.id, role: user.role});
        res.status(201).json({ status: 'success', token, user, message: 'User account created successfully' });
    } catch(error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error, sign up failed', error: error });
    }
}

const login = async (req, res) => {
    try {
        // Filters for searching for a user in the database
        const filters = {};
        if(req.body.email) filters.email = req.body.email;
        if(req.body.username) filters.username = req.body.username;

        // Unique columns so it will return a list with one object
        const [user] = await userService.search(filters);

        if (!user) {
            return res.status(400).json({ status: 'error', message: 'Invalid credentials' });
        }

        // Compare actual password with input password
        const passwordMatches = await bcrypt.compare(req.body.password, user.password);

        if (user && passwordMatches) {
            delete user.password; // Don't send password to client
            
            // Create token
            const token = generateJWT({id: user.id, role: user.role});
            res.status(200).json({ status: 'success', token, user, message: 'User logged in successfully' });
        } else {
            res.status(400).json({ status: 'error', message: 'Invalid email or password' });
        }
    } catch(error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error, login failed', error: error });
    }
}

export {
    signUp,
    login
}