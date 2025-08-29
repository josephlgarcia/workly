const API_BASE_URL = 'http://localhost:3001/api/v1'; 

export const getAllEmployees = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/employee`);
        if (!response.ok) {
            throw new Error('Error al obtener los empleados');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export const getEmployeeById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/employee/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el empleado');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};