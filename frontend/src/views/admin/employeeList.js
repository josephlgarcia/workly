import { initEmployeeListEvents } from "../../controllers/employeeListController.js";
import { api } from '../../api/api.js';

export async function showEmployeeList() {
    document.getElementById('admin-subview').innerHTML = `
    <div class="container-fluid px-4">
        <h1 class="mt-4 text-center">Empleados</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item"><a href="#" data-view="dashboard">Dashboard</a></li>
            <li class="breadcrumb-item active">Empleados</li>
        </ol>
        <div class="mb-4">
            <a href="">
                <a id="create-employee" href="#" data-view="createEmployee" type="button" class="btn btn-primary" >Añadir nuevo empleado</a>
            </a>
        </div>

        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                Tabla Empleados
            </div>
            <div class="card-body">
                <table id="datatablesSimple" class="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Documento</th>
                            <th>N° Contrato</th>
                            <th>Fecha inicio</th>
                            <th>Fecha fin</th>
                            <th>Sueldo</th>
                            <th>T. Contrato</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody id="employee-table-body">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
`;
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

    initEmployeeListEvents();
}