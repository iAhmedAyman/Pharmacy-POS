import * as saleService from '../services/sale.service.js';

const create = async (req, res) => {
    try {
        // Add userId to the body
        req.body.userId = req.userId; // Assigned in auth middleware
        const sale = await saleService.create(req.body);
        res.status(200).json({ status: 'success', sale, message: 'Sale created successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error, batch creation failed', error: error });
    }
}

const update = async (req, res) => {
    try {
        const sale = await saleService.update(req.body);
        res.status(200).json({ status: 'success', sale, message: 'Sale updated successfully' });
    } catch(error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error, update failed', error: error });
    }
}

const search = async (req, res) => {
    try {
        const sales = await saleService.search(req.query);
        res.status(200).json({ status: 'success', sales, message: 'Sales found successfully' });
    } catch(error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error, searching failed', error: error });
    }
}

export {
    create,
    update,
    search
}