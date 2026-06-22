import * as productService from '../services/product.service.js';

const create = async (req, res) => {
    try {
        const product = await productService.create(req.body);
        res.status(200).json({ status: 'success', product, message: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error, batch creation failed', error: error });
    }
}

const update = async (req, res) => {
    try {
        const product = await productService.update(req.body);
        res.status(200).json({ status: 'success', product, message: 'Product updated successfully' });
    } catch(error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error, update failed', error: error });
    }
}

const search = async (req, res) => {
    try {
        const products = await productService.search(req.query);
        res.status(200).json({ status: 'success', products, message: 'Products found successfully' });
    } catch(error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error, searching failed', error: error });
    }
}

export {
    create,
    update,
    search
}