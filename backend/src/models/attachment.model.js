const pool = require('../../database/db');

const Attachment = {
    create: async (attachmentData) => {
        try {
            const query = `
                INSERT INTO attachments (leave_id, file_name, file_route, comments)
                VALUES (?, ?, ?, ?);
            `;
            const values = [
                attachmentData.leave_id,
                attachmentData.file_name,
                attachmentData.file_route,
                attachmentData.comments
            ];
            const [result] = await pool.query(query, values);
            return result.insertId;
        } catch (error) {
            console.error('Error creating attachment:', error);
            throw error;
        }
    }
};

module.exports = Attachment;