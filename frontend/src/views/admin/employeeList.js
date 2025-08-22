import { loadDynamicStyle } from "../../utils/styleManager.js";
import { initEmployeeListEvents } from "../../controllers/employeeListController.js";

export async function showEmployeeList() {
    document.getElementById('admin-subview').innerHTML = `
    <h1>Lista de Empleados</h1>
    <table class="employee-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Departamento</th>
                <th>Cargo</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>EMP001</td>
                <td>Ana García</td>
                <td>Recursos Humanos</td>
                <td>Analista</td>
                <td>Activo</td>
            </tr>
            <tr>
                <td>EMP002</td>
                <td>Carlos Pérez</td>
                <td>TI</td>
                <td>Desarrollador</td>
                <td>Activo</td>
            </tr>
            <tr>
                <td>EMP003</td>
                <td>Lucía Torres</td>
                <td>Finanzas</td>
                <td>Contadora</td>
                <td>Inactivo</td>
            </tr>
        </tbody>
    </table>
`;

    loadDynamicStyle('./src/styles/employeeList.css', 'employeeList', ['adminDashboard']);
    initEmployeeListEvents();
}