const pool = require('../../database/db');

const Paysheet = {
    getAll: async () => {
        try {
            const query = `
                SELECT 
                    p.*,
                    e.first_name, 
                    e.last_name,
                    c.salary
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
            console.error('Error al obtener todas las nóminas:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const query = `
                SELECT 
                    p.*,
                    e.first_name, 
                    e.last_name,
                    c.salary
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
            console.error('Error al obtener nómina por ID:', error);
            throw error;
        }
    },

    create: async (paysheetData, overtimes = [], socialSecurityIds = []) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const contractQuery = 'SELECT salary FROM contracts WHERE employee_id = ? AND contract_status_id = ?';
            const [contractRows] = await connection.query(contractQuery, [paysheetData.employee_id, 1]); 

            if (contractRows.length === 0) {
                throw new Error('No se encontró un contrato activo para este empleado.');
            }

            const employeeSalary = contractRows[0].salary;

            let totalOvertimeAmount = 0;
            if (overtimes.length > 0) {
                const overtimeTypesQuery = 'SELECT id_overtime_type, percentage FROM overtime_types';
                const [overtimeTypes] = await connection.query(overtimeTypesQuery);
                const overtimePercentages = {};
                overtimeTypes.forEach(type => {
                    overtimePercentages[type.id_overtime_type] = type.percentage;
                });

                overtimes.forEach(overtime => {
                    const percentage = overtimePercentages[overtime.overtime_type_id] || 1;
                    totalOvertimeAmount += overtime.hours * (employeeSalary * percentage);
                });
            }

            let totalSocialSecurityDiscount = 0;
            const socialSecurityDiscounts = [];

            if (socialSecurityIds.length > 0) {
                const socialSecurityTypesQuery = `SELECT id_social_security, percentage FROM social_security_types WHERE id_social_security IN (?)`;
                const [socialSecurityTypes] = await connection.query(socialSecurityTypesQuery, [socialSecurityIds]);

                socialSecurityTypes.forEach(ssType => {
                    const discount = employeeSalary * (ssType.percentage - 1);
                    totalSocialSecurityDiscount += discount;
                    socialSecurityDiscounts.push({
                        social_security_id: ssType.id_social_security,
                        total_discount: discount
                    });
                });
            }

            const totalPayment = employeeSalary + totalOvertimeAmount + (paysheetData.bonus || 0) - totalSocialSecurityDiscount;

            const paysheetQuery = `
                INSERT INTO paysheets (employee_id, bonus, subtotal_payment, total_payment)
                VALUES (?, ?, ?, ?)
            `;
            const [paysheetResult] = await connection.query(paysheetQuery, [
                paysheetData.employee_id,
                paysheetData.bonus || 0,
                employeeSalary,
                totalPayment
            ]);
            const newPaysheetId = paysheetResult.insertId;

            if (overtimes.length > 0) {
                const overtimeValues = overtimes.map(ot => [newPaysheetId, ot.overtime_type_id, ot.hours]);
                const overtimeQuery = 'INSERT INTO paysheet_overtime (paysheet_id, overtime_type_id, hours) VALUES ?';
                await connection.query(overtimeQuery, [overtimeValues]);
            }

            if (socialSecurityDiscounts.length > 0) {
                const socialSecurityValues = socialSecurityDiscounts.map(ss => [newPaysheetId, ss.social_security_id, ss.total_discount]);
                const socialSecurityQuery = 'INSERT INTO paysheet_social_securities (paysheet_id, social_security_id, total_discount) VALUES ?';
                await connection.query(socialSecurityQuery, [socialSecurityValues]);
            }
            
            await connection.commit();
            return newPaysheetId;

        } catch (error) {
            await connection.rollback();
            console.error('Error al crear la nómina:', error);
            throw error;
        } finally {
            connection.release();
        }
    }
};

module.exports = Paysheet;
