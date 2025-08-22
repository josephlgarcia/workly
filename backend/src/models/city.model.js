const pool = require('./db');

const City = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM cities');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM cities WHERE id_city = ?', [id]);
        return rows[0];
    },

    create: async (city) => {
        const { name } = city;
        const [result] = await pool.query('INSERT INTO cities (name) VALUES (?)', [name]);
        return result.insertId;
    },

    update: async (id, city) => {
        const { name } = city;
        await pool.query('UPDATE cities SET name = ? WHERE id_city = ?', [name, id]);
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM cities WHERE id_city = ?', [id]);
        return true;
    }
};

module.exports = City;