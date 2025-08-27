const pool = require('../../database/db');

const OvertimeType = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM overtime_types');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM overtime_types WHERE id_overtime_type = ?', [id]);
        return rows[0];
    },

    create: async (overtimeType) => {
        const { name, percentage } = overtimeType;
        const [result] = await pool.query('INSERT INTO overtime_types (name, percentage) VALUES (?, ?)', [name, percentage]);
        return result.insertId;
    },

    update: async (id, overtimeType) => {
        const { name, percentage } = overtimeType;
        await pool.query('UPDATE overtime_types SET name = ?, percentage = ? WHERE id_overtime_type = ?', [name, percentage, id]);
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM overtime_types WHERE id_overtime_type = ?', [id]);
        return true;
    }
};

module.exports = OvertimeType;