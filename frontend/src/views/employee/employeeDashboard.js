
import { initEmployeeDashboardEvents } from "../../controllers/employeeDashboardController.js"; // import controllers that control the dashboard view
import { loadDynamicStyle } from "../../utils/styleManager.js"; // import function that controls dynamic CSS

export async function showEmployeeDashboard() {
    document.getElementById('app').innerHTML = `
    <h1>Employee Dashboard</h1>
    <nav>
        <a href="#/employee/Payments">Pagos</a>
        <a href="#/employee/Details">Información personal</a>
        <a href="#/employee/Contract">Datos del contrato</a>
        <a href="#/employee/LeaveRequest">Solicitud de permisos</a>
        <a href="#/employee/LeaveHistory">Historial de permisos</a>
    </nav>
    <div id="employee-subview"></div>
`;

    loadDynamicStyle('./src/styles/employeeDashboard.css', 'employeeDashboard');
    initEmployeeDashboardEvents();
}