const pool = require('../../database/db');

const Role = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM roles');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM roles WHERE id_role = ?', [id]);
        return rows[0];
    },

    create: async (role) => {
        const { name } = role;
        const [result] = await pool.query('INSERT INTO roles (name) VALUES (?)', [name]);
        return result.insertId;
    },

    update: async (id, role) => {
        const { name } = role;
        await pool.query('UPDATE roles SET name = ? WHERE id_role = ?', [name, id]);
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM roles WHERE id_role = ?', [id]);
        return true;
    }
};

module.exports = Role;