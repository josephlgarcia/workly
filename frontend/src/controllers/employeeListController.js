import { api } from '../api/api.js';

export async function initEmployeeListEvents() {
    try {
    const employees = await api.getData('http://localhost:3001/api/v1/employee');
    console.log('Datos de empleados:', employees);

    const tableBody = document.querySelector('#employee-table-body');
    if (tableBody) {
        tableBody.innerHTML = '';
        employees.forEach(employee => {
            const row = document.createElement('tr');
            const status = employee.status === 1 ? 'Active' : 'Inactive';
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
        console.error('Error in loadEmployeeView:', error);
    }
}