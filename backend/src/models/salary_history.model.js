const pool = require('../../database/db');

const SalaryHistory = {
    getAll: async () => {
        try {
            const query = `
                SELECT 
                    id_salary_history,
                    contract_id,
                    old_salary,
                    new_salary,
                    date,
                    reason,
                    created_at
                FROM salary_history
                ORDER BY created_at DESC;
            `;
            const [rows] = await pool.query(query);
            return rows;
        } catch (error) {
            console.error('Error al obtener todo el historial salarial:', error);
            throw error;
        }
    },

    getByContractId: async (contractId) => {
        try {
            const query = `
                SELECT 
                    id_salary_history,
                    contract_id,
                    old_salary,
                    new_salary,
                    date,
                    reason,
                    created_at
                FROM salary_history
                WHERE contract_id = ?
                ORDER BY created_at DESC;
            `;
            const [rows] = await pool.query(query, [contractId]);
            return rows;
        } catch (error) {
            console.error('Error al obtener historial salarial por ID de contrato:', error);
            throw error;
        }
    },

    create: async (contractId, oldSalary, newSalary, date, reason) => {
        try {
            const query = `
                INSERT INTO salary_history (contract_id, old_salary, new_salary, date, reason)
                VALUES (?, ?, ?, ?, ?);
            `;
            const values = [contractId, oldSalary, newSalary, date, reason];
            const [result] = await pool.query(query, values);
            return result.insertId;
        } catch (error) {
            console.error('Error al crear registro de historial salarial:', error);
            throw error;
        }
    }

};

module.exports = SalaryHistory;
