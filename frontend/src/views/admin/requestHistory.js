// import { loadDynamicStyle } from "../../utils/styleManager.js";
// import { initRequestHistoryEvents } from "../../controllers/requestHistoryController.js";

export async function showRequestHistory() {
    document.getElementById('admin-subview').innerHTML = `
    <h1>Historial de Solicitudes</h1>
    <table class="history-table">
        <thead>
            <tr>
                <th>ID Solicitud</th>
                <th>Empleado</th>
                <th>Motivo</th>
                <th>Desde</th>
                <th>Hasta</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>REQ001</td>
                <td>Ana García</td>
                <td>Vacaciones</td>
                <td>2025-09-01</td>
                <td>2025-09-10</td>
                <td><span class="status approved">Aprobado</span></td>
            </tr>
            <tr>
                <td>REQ002</td>
                <td>Carlos Pérez</td>
                <td>Enfermedad</td>
                <td>2025-09-03</td>
                <td>2025-09-05</td>
                <td><span class="status rejected">Rechazado</span></td>
            </tr>
        </tbody>
    </table>
`;


    // loadDynamicStyle('./src/styles/requestHistory.css', 'requestHistory', ['adminDashboard']);
    // initRequestHistoryEvents();
}