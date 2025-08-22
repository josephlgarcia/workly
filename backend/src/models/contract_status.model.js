const pool = require('./db');

const ContractStatus = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM contract_status');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM contract_status WHERE id_contract_status = ?', [id]);
        return rows[0];
    },

    create: async (contractStatus) => {
        const { name } = contractStatus;
        const [result] = await pool.query('INSERT INTO contract_status (name) VALUES (?)', [name]);
        return result.insertId;
    },

    update: async (id, contractStatus) => {
        const { name } = contractStatus;
        await pool.query('UPDATE contract_status SET name = ? WHERE id_contract_status = ?', [name, id]);
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM contract_status WHERE id_contract_status = ?', [id]);
        return true;
    }
};

module.exports = ContractStatus;