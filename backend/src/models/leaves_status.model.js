const pool = require('./db');

const LeaveStatus = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM leave_status');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM leave_status WHERE id_leave_status = ?', [id]);
        return rows[0];
    },

    create: async (leaveStatus) => {
        const { name } = leaveStatus;
        const [result] = await pool.query('INSERT INTO leave_status (name) VALUES (?)', [name]);
        return result.insertId;
    },

    update: async (id, leaveStatus) => {
        const { name } = leaveStatus;
        await pool.query('UPDATE leave_status SET name = ? WHERE id_leave_status = ?', [name, id]);
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM leave_status WHERE id_leave_status = ?', [id]);
        return true;
    }
};

module.exports = LeaveStatus;