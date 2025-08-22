const pool = require('./db');

const Departament = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM departaments');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM departaments WHERE id_departament = ?', [id]);
        return rows[0];
    },

    create: async (departament) => {
        const { name } = departament;
        const [result] = await pool.query('INSERT INTO departaments (name) VALUES (?)', [name]);
        return result.insertId;
    },

    update: async (id, departament) => {
        const { name } = departament;
        await pool.query('UPDATE departaments SET name = ? WHERE id_departament = ?', [name, id]);
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM departaments WHERE id_departament = ?', [id]);
        return true;
    }
};

module.exports = Departament;