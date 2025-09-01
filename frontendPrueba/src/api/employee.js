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

export const createEmployee = async (employeeData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/employee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeData),
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Error al crear el empleado');
        }
        return result;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export const updateEmployee = async (id, employeeData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/employee/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeData),
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Error al actualizar el empleado');
        }
        return result;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export const deleteEmployee = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/employee/${id}`, {
            method: 'DELETE',
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Error al eliminar el empleado');
        }
        return result;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};