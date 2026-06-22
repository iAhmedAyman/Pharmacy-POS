import * as customerService from '../services/customer.service.js';

const create = async (req, res) => {
    try {
        const customer = await customerService.create(req.body);
        res.status(200).json({ status: 'success', customer, message: 'Customer created successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error, batch creation failed', error: error });
    }
}

const update = async (req, res) => {
    try {
        const customer = await customerService.update(req.body);
        res.status(200).json({ status: 'success', customer, message: 'Customer updated successfully' });
    } catch(error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error, update failed', error: error });
    }
}

const search = async (req, res) => {
    try {
        const customers = await customerService.search(req.query);
        res.status(200).json({ status: 'success', customers, message: 'Customers found successfully' });
    } catch(error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error, searching failed', error: error });
    }
}

export {
    create,
    update,
    search
}