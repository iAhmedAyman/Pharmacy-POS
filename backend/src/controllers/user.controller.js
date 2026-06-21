import * as userService from '../services/user.service'

const update = async (req, res) => {
    try {
        const user = await userService.update(req.body);
        res.status(200).json({ status: 'success', user: user, message: 'User account updated successfully' });
    } catch(error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error, update failed', error: error });
    }
}

const search = async (req, res) => {
    try {
        const users = await userService.search(req.body);
        res.status(200).json({ status: 'success', users: users, message: 'Users found successfully' });
    } catch(error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error, searching failed', error: error });
    }
}

export {
    update,
    search
}