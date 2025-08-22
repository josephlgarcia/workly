const City = require('../models/city.model');

const cityController = {
    getAllCities: async (req, res) => {
        try {
            const cities = await City.getAll();
            res.json(cities);
        } catch (error) {
            res.status(500).json({ message: 'Error to get all cities', error: error.message });
        }
    },

    getCityById: async (req, res) => {
        try {
            const city = await City.getById(req.params.id);
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.json(city);
        } catch (error) {
            res.status(500).json({ message: 'Error to get the city', error: error.message });
        }
    },

    createCity: async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'City name is required field.' });
        }

        try {
            const newCityId = await City.create(req.body);
            res.status(201).json({ message: 'City Created successful!', id: newCityId });
        } catch (error) {
            res.status(500).json({ message: 'Error to create the city', error: error.message });
        }
    },

    updateCity: async (req, res) => {
        try {
            const { id } = req.params;
            await City.update(id, req.body);
            res.status(200).json({ message: 'City Updated successful!'});
        } catch (error) {
            res.status(500).json({ message: 'Error to update the city', error: error.message });
        }
    },

    deleteCity: async (req, res) => {
        try {
            const { id } = req.params;
            await City.delete(id);
            res.status(200).json({ message: 'City Deleted successful!' });
        } catch (error) {
            res.status(500).json({ message: 'Error to delete the city', error: error.message });
        }
    }
};

module.exports = cityController;