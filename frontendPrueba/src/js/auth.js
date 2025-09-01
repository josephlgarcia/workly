// auth.js

/**
 * Guarda el objeto del usuario en el localStorage.
 * @param {object} employee - El objeto del empleado.
 */
export const setCurrentUser = (employee) => {
    try {
        localStorage.setItem('employee', JSON.stringify(employee));
        console.log('Usuario guardado en localStorage:', employee);
    } catch (error) {
        console.error('Error al guardar el usuario en localStorage:', error);
    }
};

/**
 * Obtiene el objeto del usuario del localStorage.
 * @returns {object|null} El objeto del empleado o null si no se encuentra.
 */
export const getCurrentUser = () => {
    try {
        const employeeString = localStorage.getItem('employee');
        if (employeeString) {
            return JSON.parse(employeeString);
        }
        return null;
    } catch (error) {
        console.error('Error al obtener el usuario del localStorage:', error);
        return null;
    }
};

/**
 * Elimina el usuario del localStorage.
 */
export const logout = () => {
    try {
        localStorage.removeItem('employee');
        console.log('Usuario eliminado de localStorage.');
        // Puedes añadir aquí la redirección a la página de login
        // window.location.href = '/login.html'; 
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
};
