const API_BASE_URL = 'http://localhost:3001/api/v1';

export async function getLeaveTypes() {
    try {
        const response = await fetch(`${API_BASE_URL}/leaves-type`);
        if (!response.ok) {
            throw new Error('Error al obtener los tipos de permiso');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error en getLeaveTypes:', error);
        throw error;
    }
}

export async function getAllLeaves() {
    try {
        const response = await fetch(`${API_BASE_URL}/leave`);
        if (!response.ok) {
            throw new Error('Error al obtener las solicitudes de permiso');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error en getAllLeaves:', error);
        throw error;
    }
}

export async function createLeave(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}/leave`, {
            method: 'POST',
            body: formData,
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Error al crear la solicitud de permiso.');
        }
        return result;
    } catch (error) {
        console.error('Fetch error en createLeave:', error);
        throw error;
    }
}


