const pool = require('../../database/db');

const SocialSecurityType = {
    getAll: async () => {
        const [rows] = await pool.query('SELECT * FROM social_security_types');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM social_security_types WHERE id_social_security_type = ?', [id]);
        return rows[0];
    },

    create: async (socialSecurityType) => {
        const { name } = socialSecurityType;
        const [result] = await pool.query('INSERT INTO social_security_types (name) VALUES (?)', [name]);
        return result.insertId;
    },

    update: async (id, socialSecurityType) => {
        const { name } = socialSecurityType;
        await pool.query('UPDATE social_security_types SET name = ? WHERE id_social_security_type = ?', [name, id]);
        return true;
    },

    delete: async (id) => {
        await pool.query('DELETE FROM social_security_types WHERE id_social_security_type = ?', [id]);
        return true;
    }
};

module.exports = SocialSecurityType;