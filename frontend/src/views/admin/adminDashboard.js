
import { loadDynamicStyle } from "../../utils/styleManager.js";
import { initAdminDashboardEvents } from "../../controllers/adminDashboardController.js";

export async function showAdminDashboard() {
    document.getElementById('app').innerHTML = `
    <h1>Admin Dashboard</h1>
    <nav>
        <a href="#/admin/dashboard/employeeList">Información empleados</a>
        <a href="#/admin/dashboard/requestApproval">Solicitudes de permisos</a>
        <a href="#/admin/dashboard/requestsHistory">Permisos aprobados</a>
    </nav>
    <div id="admin-subview"></div>
`;


    loadDynamicStyle('./src/styles/adminDashboard.css', 'adminDashboard');
    initAdminDashboardEvents();
}