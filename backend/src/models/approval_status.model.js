const pool = require('./db');

const ApprovalStatus = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM approval_status');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM approval_status WHERE id_approval_status = ?', [id]);
        return rows[0];
    },

    create: async (approvalStatus) => {
        const { name } = approvalStatus;
        const [result] = await pool.query('INSERT INTO approval_status (name) VALUES (?)', [name]);
        return result.insertId;
    },

    update: async (id, approvalStatus) => {
        const { name } = approvalStatus;
        await pool.query('UPDATE approval_status SET name = ? WHERE id_approval_status = ?', [name, id]);
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM approval_status WHERE id_approval_status = ?', [id]);
        return true;
    }
};

module.exports = ApprovalStatus;