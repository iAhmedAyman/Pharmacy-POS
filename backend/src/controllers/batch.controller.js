import * as batchService from '../services/batch.service.js';

const create = async (req, res) => {
    try {
        const batch = await batchService.create(req.body);
        res.status(200).json({ status: 'success', batch, message: 'Batch created successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error, batch creation failed', error: error });
    }
}

const update = async (req, res) => {
    try {
        const batch = await batchService.update(req.body);
        res.status(200).json({ status: 'success', batch, message: 'Batch updated successfully' });
    } catch(error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error, update failed', error: error });
    }
}

const search = async (req, res) => {
    try {
        const batches = await batchService.search(req.query);
        res.status(200).json({ status: 'success', batches, message: 'Batches found successfully' });
    } catch(error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error, searching failed', error: error });
    }
}

export {
    create,
    update,
    search
}