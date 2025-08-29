const pool = require('../../database/db');

const Employee = {
    getAll: async () => {
        const query = `
        SELECT
            CONCAT(e.first_name, ' ', e.last_name) AS full_name,
            e.document_number,
            e.status,
            c.id_contract,
            c.start_date,
            c.end_date,
            c.salary,
            ct.name AS contract_type_name
        FROM employees AS e
        LEFT JOIN contracts AS c ON e.id_employee = c.employee_id
        LEFT JOIN contract_types AS ct ON c.contract_type_id = ct.id_contract_type;
    `;

        const [rows] = await pool.query(query);
        const employees = {};

        rows.forEach(row => {
            if (!employees[row.id_employee]) {
                const { phone_number, ...employeeData } = row;
                employees[row.id_employee] = {
                    ...employeeData,
                    phones: []
                };
            }

            if (row.phone_number) {
                employees[row.id_employee].phones.push(row.phone_number);
            }
        });

        return Object.values(employees);
    },

    getById: async (id) => {
        const query = `
        SELECT
            CONCAT(e.first_name, ' ', e.last_name) AS full_name,
            e.document_number,
            e.status,
            c.id_contract,
            c.start_date,
            c.end_date,
            c.salary,
            ct.name AS contract_type_name
        FROM employees AS e
        LEFT JOIN contracts AS c ON e.id_employee = c.employee_id
        LEFT JOIN contract_types AS ct ON c.contract_type_id = ct.id_contract_type
        WHERE e.id_employee = ?;
    `;
        const [rows] = await pool.query(query, [id]);

        const { phone_number, ...employeeData } = rows[0];
        const employee = { ...employeeData, phones: [] };

        rows.forEach(row => {
            if (row.phone_number) {
                employee.phones.push(row.phone_number);
            }
        });

        return employee;
    },

    getByDocumentNumber: async (document_number) => {
        try {
            const query = `
        SELECT
            CONCAT(e.first_name, ' ', e.last_name) AS full_name,
            e.document_number,
            c.contract_number,
            c.start_date,
            c.end_date,
            c.salary,
            ct.name AS contract_type_name
        FROM employees AS e
        LEFT JOIN contracts AS c ON e.id_employee = c.employee_id
        LEFT JOIN contract_types AS ct ON c.contract_type_id = ct.id_contract_type
        WHERE e.document_number = ?;
    `;

            const [rows] = await pool.query(query, [document_number]);

            return rows[0] || null;
        } catch (error) {
            console.error('Error al obtener empleado por número de documento:', error);
            throw error;
        }
    },

    create: async (employeeData, phoneNumbers) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const vacationDaysAvailable = 15;
            const employeeQuery = `
                    INSERT INTO employees (
                        role_id, position_id, departament_id, city_id, document_type, 
                        first_name, last_name, document_number, address, email, gender, 
                        vacation_days_available, password
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
            const employeeValues = [
                employeeData.role_id, employeeData.position_id, employeeData.departament_id, employeeData.city_id,
                employeeData.document_type, employeeData.first_name, employeeData.last_name, employeeData.document_number,
                employeeData.address, employeeData.email, employeeData.gender, vacationDaysAvailable,
                employeeData.password
            ];

            const [employeeResult] = await connection.query(employeeQuery, employeeValues);
            const newEmployeeId = employeeResult.insertId;

            if (phoneNumbers && phoneNumbers.length > 0) {
                const phoneValues = phoneNumbers.map(phone => [newEmployeeId, phone]);
                const phoneQuery = 'INSERT INTO employee_phones (employee_id, phone_number) VALUES ?';
                await connection.query(phoneQuery, [phoneValues]);
            }

            await connection.commit();
            return newEmployeeId;

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    update: async (id, employeeData, phoneNumbers) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const updateQuery = 'UPDATE employees SET ? WHERE id_employee = ?';
            const [employeeResult] = await connection.query(updateQuery, [employeeData, id]);

            if (employeeResult.affectedRows === 0) {
                await connection.rollback();
                return false;
            }

            await connection.query('DELETE FROM employee_phones WHERE employee_id = ?', [id]);

            if (phoneNumbers && phoneNumbers.length > 0) {
                const phoneValues = phoneNumbers.map(phone => [id, phone]);
                const phoneQuery = 'INSERT INTO employee_phones (employee_id, phone_number) VALUES ?';
                await connection.query(phoneQuery, [phoneValues]);
            }

            await connection.commit();
            return true;

        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },

    delete: async (id) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            await connection.query('DELETE FROM employee_phones WHERE employee_id = ?', [id]);
            const [deleteResult] = await connection.query('DELETE FROM employees WHERE id_employee = ?', [id]);

            await connection.commit();
            return deleteResult.affectedRows > 0;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
};

module.exports = Employee;