const pool = require('../../database/db');

const LeaveType = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM leaves_types');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM leaves_types WHERE id_leave_type = ?', [id]);
        return rows[0];
    },

    create: async (leaveType) => {
        const { name, leavesFile } = leaveType;
        const [result] = await pool.query('INSERT INTO leaves_types (name, leaves_file) VALUES (?, ?)', [name, leavesFile]);
        return result.insertId;
    },

    update: async (id, leaveType) => {
        const { name, leavesFile } = leaveType;
        await pool.query('UPDATE leaves_types SET name = ?, leaves_file = ? WHERE id_leave_type = ?', [name, leavesFile, id]);
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM leaves_types WHERE id_leave_type = ?', [id]);
        return true;
    }
};

module.exports = LeaveType;