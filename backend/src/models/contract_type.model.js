const pool = require('./db');

const ContractType = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM contract_types');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM contract_types WHERE id_contract_type = ?', [id]);
        return rows[0];
    },

    create: async (contractType) => {
        const { name } = contractType;
        const [result] = await pool.query('INSERT INTO contract_types (name) VALUES (?)', [name]);
        return result.insertId;
    },

    update: async (id, contractType) => {
        const { name } = contractType;
        await pool.query('UPDATE contract_types SET name = ? WHERE id_contract_type = ?', [name, id]);
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM contract_types WHERE id_contract_type = ?', [id]);
        return true;
    }
};

module.exports = ContractType;