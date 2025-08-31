const pool = require('../../database/db');

const Leave = {
    create: async (leaveData) => {
        try {
            const query = `
                INSERT INTO leaves (employee_id, leave_status_id, creation_date, leave_type_id, start_day, end_day, description)
                VALUES (?, ?, ?, ?, ?, ?, ?);
            `;
            const values = [
                leaveData.employee_id,
                leaveData.leave_status_id || 3, 
                leaveData.creation_day || new Date(),
                leaveData.leave_type_id,
                leaveData.start_day,
                leaveData.end_day,
                leaveData.description
            ];
            const [result] = await pool.query(query, values);
            return result.insertId;
        } catch (error) {
            console.error('Error creating leave request:', error);
            throw error;
        }
    },

    getAll: async () => {
        try {
            const query = `
                SELECT
                    l.id_leave,
                    l.employee_id,
                    l.leave_status_id,
                    e.first_name,
                    e.last_name,
                    ls.name AS status,
                    lt.name AS leaves_type,
                    l.start_day,
                    l.end_day,
                    l.description
                FROM leaves AS l
                LEFT JOIN employees AS e ON l.employee_id = e.id_employee
                LEFT JOIN leaves_status AS ls ON l.leave_status_id = ls.id_leave_status
                LEFT JOIN leaves_types AS lt ON l.leave_type_id = lt.id_leave_type
            `;
            const [rows] = await pool.query(query);
            return rows;
        } catch (error) {
            console.error('Error getting all leave requests:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const query = `
                SELECT
                    l.id_leave,
                    l.employee_id,
                    l.leave_status_id,
                    e.first_name,
                    e.last_name,
                    ls.name AS status,
                    lt.name AS leaves_type,
                    l.start_day,
                    l.end_day,
                    l.description
                FROM leaves AS l
                LEFT JOIN employees AS e ON l.employee_id = e.id_employee
                LEFT JOIN leaves_status AS ls ON l.leave_status_id = ls.id_leave_status
                LEFT JOIN leaves_types AS lt ON l.leave_type_id = lt.id_leave_type
                WHERE l.id_leave = ?;
            `;
            const [rows] = await pool.query(query, [id]);
            return rows[0]; 
        } catch (error) {
            console.error('Error getting leave request by ID:', error);
            throw error;
        }
    },

    getByEmployeeId: async (employeeId) => {
        try {
            const query = `
                SELECT
                    l.id_leave,
                    l.employee_id,
                    l.leave_status_id,
                    e.first_name,
                    e.last_name,
                    ls.name AS status,
                    lt.name AS leaves_type,
                    l.start_day,
                    l.end_day,
                    l.description
                FROM leaves AS l
                LEFT JOIN employees AS e ON l.employee_id = e.id_employee
                LEFT JOIN leaves_status AS ls ON l.leave_status_id = ls.id_leave_status
                LEFT JOIN leaves_types AS lt ON l.leave_type_id = lt.id_leave_type
                WHERE l.employee_id = ?;
            `;
            const [rows] = await pool.query(query, [employeeId]);
            return rows;
        } catch (error) {
            console.error('Error getting leave requests by employee ID:', error);
            throw error;
        }
    },
    update: async (id, updatedData) => {
        try {
            const query = 'UPDATE leaves SET ? WHERE id_leave = ?';
            const [result] = await pool.query(query, [updatedData, id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error updating leave request:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const query = 'DELETE FROM leaves WHERE id_leave = ?';
            const [result] = await pool.query(query, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error deleting leave request:', error);
            throw error;
        }
    }
};

module.exports = Leave;
