import { initEmployeeDashboardEvents } from "../../controllers/employeeDashboardController.js";

export async function showEmployeeDashboard() {
    document.getElementById('app').innerHTML = `
        <div class="d-flex flex-column vh-100">
            <header class="bg-primary text-white p-3">
                <h1>Workly</h1>
            </header>

            <main class="d-flex flex-grow-1">
                <div id="sidebar" style="width: 250px;">
                    <aside class="d-flex flex-column flex-shrink-0 p-3 bg-light h-100">
                        <span class="fs-4">Menú empleado</span>
                        <hr>
                        <ul class="nav nav-pills flex-column mb-auto">
                            <li class="nav-item">
                                <a href="#/employee" class="nav-link link-dark" data-view="dashboard">
                                    Dashboard
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#/employee/details" class="nav-link link-dark" data-view="employeeDetails">
                                    Mis datos
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#/employee/leaveHistory" class="nav-link link-dark" data-view="employeeLeaveHistory">
                                    Historial de permisos
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#/employee/leaveRequest" class="nav-link link-dark" data-view="employeeLeaveRequest">
                                    Solicitar permiso
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#/employee/contract" class="nav-link link-dark" data-view="employeeContract">
                                    Contrato
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#/employee/payments" class="nav-link link-dark" data-view="employeePayments">
                                    Pagos
                                </a>
                            </li>
                        </ul>
                    </aside>
                </div>

                <div id="employee-subview" class="flex-grow-1 overflow-auto p-3">
                    <h2>Bienvenido al Panel de Empleado</h2>
                    <p>Selecciona una opción del menú para ver más detalles.</p>
                </div>
            </main>

            <footer class="bg-dark text-white text-center p-2">
                <small>&copy; 2025 Workly</small>
            </footer>
        </div>
    `;

    initEmployeeDashboardEvents();
}
