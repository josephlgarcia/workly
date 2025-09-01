const pool = require('../../database/db');

const Contract = {
    getAll: async () => {
        try {
            const query = `
                SELECT 
                    c.*,
                    e.first_name, 
                    e.last_name,
                    e.document_number,
                    ct.name AS contract_type,
                    cs.name AS contract_status
                FROM 
                    contracts c
                JOIN 
                    employees e ON c.employee_id = e.id_employee
                JOIN 
                    contract_types ct ON c.contract_type_id = ct.id_contract_type
                JOIN
                    contract_status cs ON c.contract_status_id = cs.id_contract_status
                ORDER BY c.created_at DESC
            `;
            const [rows] = await pool.query(query);
            return rows;
        } catch (error) {
            console.error('Error al obtener todos los contratos:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const query = `
                SELECT 
                    c.*,
                    e.first_name, 
                    e.last_name,
                    e.document_number,
                    ct.name AS contract_type,
                    cs.name AS contract_status
                FROM 
                    contracts c
                JOIN 
                    employees e ON c.employee_id = e.id_employee
                JOIN 
                    contract_types ct ON c.contract_type_id = ct.id_contract_type
                JOIN
                    contract_status cs ON c.contract_status_id = cs.id_contract_status
                WHERE c.id_contract = ?
            `;
            const [rows] = await pool.query(query, [id]);
            return rows[0] || null;
        } catch (error) {
            console.error('Error al obtener contrato por ID:', error);
            throw error;
        }
    },

    create: async (contractData) => {
        const { employee_id, contract_type_id, contract_status_id, start_date, end_date, salary } = contractData;
        try {
            const query = `
                INSERT INTO contracts 
                    (employee_id, contract_type_id, contract_status_id, start_date, end_date, salary)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            const [result] = await pool.query(query, [
                employee_id,
                contract_type_id,
                contract_status_id,
                start_date,
                end_date,
                salary
            ]);
            return result.insertId;
        } catch (error) {
            console.error('Error al crear el contrato:', error);
            throw error;
        }
    },

    update: async (id, contractData) => {
        try {
            const query = 'UPDATE contracts SET ? WHERE id_contract = ?';
            const [result] = await pool.query(query, [contractData, id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar el contrato:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const query = 'DELETE FROM contracts WHERE id_contract = ?';
            const [result] = await pool.query(query, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el contrato:', error);
            throw error;
        }
    }
};

module.exports = Contract;
