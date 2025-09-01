import { initEmployeeLeaveHistoryEvents } from "../../controllers/employeeLeaveHistoryController.js"; // import controllers that control the dashboard view

export async function showEmployeeLeaveHistory() {
    document.getElementById('employee-subview').innerHTML = `
    <h1>Historial de Permisos</h1>
    <table class="leave-history-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Motivo</th>
                <th>Desde</th>
                <th>Hasta</th>
                <th>Días</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>PERM001</td>
                <td>Vacaciones</td>
                <td>2025-06-10</td>
                <td>2025-06-15</td>
                <td>5</td>
                <td><span class="status approved">Aprobado</span></td>
            </tr>
            <tr>
                <td>PERM002</td>
                <td>Enfermedad</td>
                <td>2025-07-01</td>
                <td>2025-07-03</td>
                <td>2</td>
                <td><span class="status rejected">Rechazado</span></td>
            </tr>
            <tr>
                <td>PERM003</td>
                <td>Asunto personal</td>
                <td>2025-08-01</td>
                <td>2025-08-02</td>
                <td>1</td>
                <td><span class="status pending">Pendiente</span></td>
            </tr>
        </tbody>
    </table>
`;


    initEmployeeLeaveHistoryEvents();
}