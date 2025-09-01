const pool = require('../../database/db');

const Paysheet = {
    getAll: async () => {
        try {
            const query = `
                SELECT 
                    p.*,
                    p.subtotal_payment,
                    e.first_name, 
                    e.last_name,
                    c.salary AS subtotal_payment
                FROM 
                    paysheets p
                JOIN 
                    employees e ON p.employee_id = e.id_employee
                LEFT JOIN 
                    contracts c ON p.employee_id = c.employee_id
                ORDER BY p.created_at DESC
            `;
            const [rows] = await pool.query(query);
            return rows;
        } catch (error) {
            console.error('Error to get all paysheets:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const query = `
                SELECT 
                    p.*,
                    p.subtotal_payment,
                    e.first_name, 
                    e.last_name,
                    c.salary AS subtotal_payment
                FROM 
                    paysheets p
                JOIN 
                    employees e ON p.employee_id = e.id_employee
                LEFT JOIN 
                    contracts c ON p.employee_id = c.employee_id
                WHERE p.id_paysheet = ?
            `;
            const [rows] = await pool.query(query, [id]);
            return rows[0] || null;
        } catch (error) {
            console.error('Error to get paysheet by id:', error);
            throw error;
        }
    },

    create: async (paysheetData) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const contractQuery = 'SELECT salary FROM contracts WHERE employee_id = ? AND contract_status_id = ?';
            const [contractRows] = await connection.query(contractQuery, [paysheetData.employee_id, 1]); 

            if (contractRows.length === 0) {
                throw new Error('No active contract found for this employee.');
            }

            const employeeSalary = contractRows[0].salary;

            const subtotalPayment = employeeSalary;
            const totalPayment = parseFloat(employeeSalary) + (parseFloat(paysheetData.bonus) || 0);

            const paysheetQuery = `
                INSERT INTO paysheets (employee_id, bonus, subtotal_payment, total_payment)
                VALUES (?, ?, ?, ?)
            `;
            const [paysheetResult] = await connection.query(paysheetQuery, [
                paysheetData.employee_id,
                paysheetData.bonus || 0,
                subtotalPayment,
                totalPayment
            ]);
            const newPaysheetId = paysheetResult.insertId;
            
            await connection.commit();
            return newPaysheetId;

        } catch (error) {
            await connection.rollback();
            console.error('Error to create paysheet:', error);
            throw error;
        } finally {
            connection.release();
        }
    }
};

module.exports = Paysheet;
