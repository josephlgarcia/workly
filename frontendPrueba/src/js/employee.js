import { getAllEmployees } from '../api/employee.js';

export async function renderEmployeeView() {
    const app = document.getElementById('app');
    if (!app) return;

    try {
        const response = await fetch('/src/views/employee.html');
        const viewHTML = await response.text();
        app.innerHTML = viewHTML;

        const employees = await getAllEmployees();
        const tableBody = document.querySelector('#employee-table-body');
        
        if (tableBody) {
            tableBody.innerHTML = '';
            employees.forEach(employee => {
                const row = document.createElement('tr');
                const status = employee.status === 1 ? 'Activo' : 'Inactivo';
                const classStatus = employee.status === 1 ? 'success' : 'danger';
                row.innerHTML = `
                    <td>${employee.full_name}</td>
                    <td>${employee.document_number}</td>
                    <td>${employee.id_contract}</td>
                    <td>${employee.start_date}</td>
                    <td>${employee.end_date}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.contract_type_name}</td>
                    <td><span class="p-2 rounded text-white bg-${classStatus}">${status}</span></td>
                `;
                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        app.innerHTML = '<p class="text-danger">Error al cargar los datos. Por favor, intente de nuevo.</p>';
        console.error('Error in renderEmployeeView:', error);
    }
}