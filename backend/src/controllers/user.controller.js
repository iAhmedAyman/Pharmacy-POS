import * as userService from '../services/user.service.js';
import bcrypt from 'bcryptjs';

const update = async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        const user = await userService.update(req.body);

        delete user.password; // Don't send password to client
        res.status(200).json({ status: 'success', user: user, message: 'User account updated successfully' });
    } catch(error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error, update failed', error: error });
    }
}

const search = async (req, res) => {
    try {
        const users = await userService.search(req.query);
        
        // Remove the password from the output
        if(users.length > 0) {
            for(const user of users) delete user.password;
        }

        res.status(200).json({ status: 'success', users: users, message: 'Users found successfully' });
    } catch(error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error, searching failed', error: error });
    }
}

export {
    update,
    search
}