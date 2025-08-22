const pool = require('./db');

const Position = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM positions');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM positions WHERE id_position = ?', [id]);
        return rows[0];
    },

    create: async (position) => {
        const { name } = position;
        const [result] = await pool.query('INSERT INTO positions (name) VALUES (?)', [name]);
        return result.insertId;
    },

    update: async (id, position) => {
        const { name } = position;
        await pool.query('UPDATE positions SET name = ? WHERE id_position = ?', [name, id]);
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM positions WHERE id_position = ?', [id]);
        return true;
    }
};

module.exports = Position;