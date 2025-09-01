const pool = require('../../database/db');

const Employee = {
    getAll: async () => {
        const query = `
            SELECT
                e.id_employee,
                CONCAT(e.first_name, ' ', e.last_name) AS full_name,
                e.document_number,
                e.status,
                c.id_contract,
                c.start_date,
                c.end_date,
                c.salary,
                ct.name AS contract_type_name,
                ep.phone_number
            FROM employees AS e
            LEFT JOIN contracts AS c ON e.id_employee = c.employee_id
            LEFT JOIN contract_types AS ct ON c.contract_type_id = ct.id_contract_type
            LEFT JOIN employee_phones AS ep ON e.id_employee = ep.employee_id
            ORDER BY e.id_employee;
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
            e.id_employee,
            e.first_name,
            e.last_name,
            e.document_number,
            e.document_type,
            e.email,
            e.address,
            e.gender,
            e.role_id,
            e.position_id,
            e.departament_id,
            e.city_id,
            ph.phone_number,
            e.password,
            e.status,
            c.id_contract,
            c.start_date,
            c.end_date,
            c.salary,
            ct.name AS contract_type
        FROM employees AS e
        LEFT JOIN contracts AS c ON e.id_employee = c.employee_id
        LEFT JOIN contract_types AS ct ON c.contract_type_id = ct.id_contract_type
        LEFT JOIN employee_phones AS ph ON ph.employee_id = e.id_employee
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
                e.id_employee,
                e.first_name,
                e.last_name,
                e.email,
                r.name AS role_name,
                CONCAT(e.first_name, ' ', e.last_name) AS full_name,
                e.document_number,
                e.password,
                c.id_contract,
                c.start_date,
                c.end_date,
                c.salary,
                ct.name AS contract_type_name
            FROM employees AS e
            LEFT JOIN contracts AS c ON e.id_employee = c.employee_id
            LEFT JOIN contract_types AS ct ON c.contract_type_id = ct.id_contract_type
            LEFT JOIN roles AS r ON r.id_role = e.role_id
            WHERE e.document_number = ?;
        `;

            const [rows] = await pool.query(query, [document_number]);

            return rows[0] || null;
        } catch (error) {
            console.error('Error al obtener empleado por número de documento:', error);
            throw error;
        }
    },

    create: async (employeeData, phoneNumbers, contractData) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const employeeQuery = `
            INSERT INTO employees (
                role_id, position_id, departament_id, city_id, document_type,
                first_name, last_name, document_number, address, email, gender,
                vacation_days_available, password
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const [employeeResult] = await connection.query(employeeQuery, [
            employeeData.role_id,
            employeeData.position_id,
            employeeData.departament_id,
            employeeData.city_id,
            employeeData.document_type,
            employeeData.first_name,
            employeeData.last_name,
            employeeData.document_number,
            employeeData.address,
            employeeData.email,
            employeeData.gender,
            employeeData.vacation_days_available || 15,
            employeeData.password
            ]);

            const employeeId = employeeResult.insertId;

            if (phoneNumbers && phoneNumbers.length > 0) {
            const phoneQuery = 'INSERT INTO employee_phones (employee_id, phone_number) VALUES ?';
            const phoneValues = phoneNumbers.map(phone => [employeeId, phone]);
            await connection.query(phoneQuery, [phoneValues]);
            }

            const contractQuery = `
            INSERT INTO contracts (
                employee_id, contract_type_id, contract_status_id,
                start_date, end_date, salary
            ) VALUES (?, ?, ?, ?, ?, ?)
            `;

            await connection.query(contractQuery, [
            employeeId,
            contractData.id_contract_type,
            contractData.id_contract_status,
            contractData.start_date,
            contractData.end_date,
            contractData.salary
            ]);

            await connection.commit();
            return { success: true, employeeId };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },


    update: async (id, employeeData, phoneNumbers, contractData) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // 🔹 Actualizar datos del empleado
            const updateQuery = 'UPDATE employees SET ? WHERE id_employee = ?';
            const [employeeResult] = await connection.query(updateQuery, [employeeData, id]);

            if (employeeResult.affectedRows === 0) {
                await connection.rollback();
                return false;
            }

            // 🔹 Actualizar teléfonos
            await connection.query('DELETE FROM employee_phones WHERE employee_id = ?', [id]);
            if (phoneNumbers && phoneNumbers.length > 0) {
                const phoneValues = phoneNumbers.map(phone => [id, phone]);
                const phoneQuery = 'INSERT INTO employee_phones (employee_id, phone_number) VALUES ?';
                await connection.query(phoneQuery, [phoneValues]);
            }

            // 🔹 Actualizar contrato
            if (contractData) {
                const updateContractQuery = `
                    UPDATE contracts 
                    SET contract_type_id = ?, contract_status_id = ?, start_date = ?, end_date = ?, salary = ? 
                    WHERE employee_id = ?`;
                await connection.query(updateContractQuery, [
                    contractData.id_contract_type,
                    contractData.id_contract_status,
                    contractData.start_date,
                    contractData.end_date,
                    contractData.salary,
                    id
                ]);
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