// import { loadDynamicStyle } from "../../utils/styleManager.js";
// import { initRequestApprovalEvents } from "../../controllers/requestApprovalController.js";

export async function showRequestApproval() {
    document.getElementById('admin-subview').innerHTML = `
    <h1>Solicitudes de Permiso Pendientes</h1>
    <table class="approval-table">
        <thead>
            <tr>
                <th>ID Solicitud</th>
                <th>Empleado</th>
                <th>Motivo</th>
                <th>Desde</th>
                <th>Hasta</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>REQ001</td>
                <td>Ana García</td>
                <td>Vacaciones</td>
                <td>2025-09-01</td>
                <td>2025-09-10</td>
                <td>
                <button class="approve-btn">Aprobar</button>
                <button class="reject-btn">Rechazar</button>
                </td>
            </tr>
            <tr>
                <td>REQ002</td>
                <td>Carlos Pérez</td>
                <td>Enfermedad</td>
                <td>2025-09-03</td>
                <td>2025-09-05</td>
                <td>
                <button class="approve-btn">Aprobar</button>
                <button class="reject-btn">Rechazar</button>
                </td>
            </tr>
        </tbody>
    </table>
`;


    // loadDynamicStyle('./src/styles/requestApproval.css', 'requestApproval', ['adminDashboard']);
    // initRequestApprovalEvents();
}