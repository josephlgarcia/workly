
import { initEmployeeDashboardEvents } from "../../controllers/employeeDashboardController.js"; // import controllers that control the dashboard view
import { loadDynamicStyle } from "../../utils/styleManager.js"; // import function that controls dynamic CSS

export async function showEmployeeDashboard() {
    document.getElementById('app').innerHTML = `
    <h1>Employee Dashboard</h1>
    <nav>
        <a href="#/employee/dashboard/Payments">Pagos</a>
        <a href="#/employee/dashboard/Details">Información personal</a>
        <a href="#/employee/dashboard/Contract">Datos del contrato</a>
        <a href="#/employee/dashboard/LeaveRequest">Solicitud de permisos</a>
        <a href="#/employee/dashboard/LeaveHistory">Historial de permisos</a>
    </nav>
    <div id="employee-subview"></div>
`;

    loadDynamicStyle('./src/styles/employeeDashboard.css', 'employeeDashboard');
    initEmployeeDashboardEvents();
}