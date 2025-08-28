const pool = require('../../database/db');

const SocialSecurity = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM social_securities');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM social_securities WHERE id_social_security = ?', [id]);
        return rows[0];
    },

    create: async (socialSecurity) => {
        const { social_security_type_id, name, percentage } = socialSecurity;
        const [result] = await pool.query('INSERT INTO social_securities (social_security_type_id, name, percentage) VALUES (?, ?, ?)', [social_security_type_id, name, percentage]);
        return result.insertId;
    },

    update: async (id, socialSecurity) => {
        const { social_security_type_id, name, percentage } = socialSecurity;
        await pool.query('UPDATE social_securities SET social_security_type_id = ?, name = ?, percentage = ? WHERE id_social_security = ?', [social_security_type_id, name, percentage, id]);
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM social_securities WHERE id_social_security = ?', [id]);
        return true;
    }
};

module.exports = SocialSecurity;