
import { initAdminDashboardEvents } from "../../controllers/adminDashboardController.js";

export async function showAdminDashboard() {
    document.getElementById('app').innerHTML = `
    <div class="d-flex flex-column vh-100">
        <header class="bg-primary text-white p-3">
            <h1>Workly</h1>
        </header>

        <main class="d-flex flex-grow-1">
            <div id="sidebar" style="width: 250px;">
            <aside class="d-flex flex-column flex-shrink-0 p-3 bg-light h-100">
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <span class="fs-4">el propio menú</span>
                </a>
                <hr>
                <ul class="nav nav-pills flex-column mb-auto">
                    <li class="nav-item">
                    <a href="#" class="nav-link link-dark" aria-current="page" data-view="dashboard">
                        Dashboard
                    </a>
                    </li>
                    <li class="nav-item dropdown">
                    <a href="#" class="btn border-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Empleados
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark">
                        <li><a class="dropdown-item" href="#/admin/employeeList" ">Empleados</a></li>
                        <li><a class="dropdown-item" href="#/admin/requestApproval" ">Solicitudes de permisos</a></li>
                        <li><a class="dropdown-item" href="#/admin/requestsHistory" ">Permisos aprobados</a></li>
                    </ul>
                    </li>
                </ul>
                </aside>
            </div>
            <div id="admin-subview" class="flex-grow-1 overflow-auto p-3"></div>
        </main>

        <footer class="bg-dark text-white text-center p-2">
            <small>&copy; 2025.</small>
        </footer>
    </div>
`;


    initAdminDashboardEvents();
}
