import { getAllEmployees } from '../api/employee.js';
import { getLeaveTypes, createLeave } from '../api/leaves.js';

const populateSelect = (selectElement, data, valueKey, textKey) => {
    selectElement.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = `Seleccione una opción`;
    selectElement.appendChild(defaultOption);
    if (Array.isArray(data) && data.length > 0) {
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item[valueKey];
            option.textContent = item[textKey];
            selectElement.appendChild(option);
        });
    } else {
        const errorOption = document.createElement('option');
        errorOption.value = '';
        errorOption.textContent = 'Error al cargar datos';
        selectElement.appendChild(errorOption);
    }
};

export async function renderLeaveView() {
    const app = document.getElementById('app');
    if (!app) return;

    try {
        const htmlResponse = await fetch('/src/views/leave.html'); // ✅ Asegúrate de que este sea el nombre correcto
        app.innerHTML = await htmlResponse.text();

        const form = document.getElementById('leaveForm');
        const messageDiv = document.getElementById('message');
        const employeeSelect = document.getElementById('employee_id');
        const leaveTypeSelect = document.getElementById('leave_type_id');
        const startDayInput = document.getElementById('start_day');
        const endDayInput = document.getElementById('end_day');

        const loadSelectData = async () => {
            try {
                const [employees, leaveTypes] = await Promise.all([
                    getAllEmployees(),
                    getLeaveTypes() 
                ]);
                populateSelect(employeeSelect, employees, 'id_employee', 'full_name');
                populateSelect(leaveTypeSelect, leaveTypes, 'id_leave_type', 'name');
            } catch (error) {
                console.error('Error al cargar datos:', error);
                employeeSelect.innerHTML = '<option value="">Error al cargar empleados</option>';
                leaveTypeSelect.innerHTML = '<option value="">Error al cargar tipos de permiso</option>';
            }
        };

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            messageDiv.textContent = '';
            messageDiv.classList.remove('text-success', 'text-danger');
            const formData = new FormData(form);

            try {
                const result = await createLeave(formData);
                messageDiv.textContent = result.message;
                messageDiv.classList.add('text-success');
                form.reset();
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
                messageDiv.textContent = error.message || 'Error al conectar con el servidor.';
                messageDiv.classList.add('text-danger');
            }
        });

        startDayInput.addEventListener('change', () => {
            endDayInput.min = startDayInput.value;
            if (endDayInput.value < startDayInput.value) {
                endDayInput.value = '';
            }
        });

        await loadSelectData();

    } catch (error) {
        console.error('Error en renderLeaveView:', error);
        app.innerHTML = '<p class="text-danger">Error al cargar la vista de permisos.</p>';
    }
}