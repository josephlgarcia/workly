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
                    <div class="row g-3 mb-4 text-center">
                        <div class="col-md-2">
                        <div class="card shadow-sm border-0">
                            <div class="card-body bg-success text-white rounded">
                            <h6 class="mb-1">Headcount</h6>
                            <h3 class="fw-bold">10</h3>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-2">
                        <div class="card shadow-sm border-0">
                            <div class="card-body bg-warning text-dark rounded">
                            <h6 class="mb-1">New Hiring</h6>
                            <h3 class="fw-bold">5</h3>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-2">
                        <div class="card shadow-sm border-0">
                            <div class="card-body bg-danger text-white rounded">
                            <h6 class="mb-1">Attrition</h6>
                            <h3 class="fw-bold">5</h3>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-3">
                        <div class="card shadow-sm border-0">
                            <div class="card-body bg-pink text-white rounded">
                            <h6 class="mb-1">Turnover Ratio</h6>
                            <h3 class="fw-bold">20.83%</h3>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-3">
                        <div class="card shadow-sm border-0">
                            <div class="card-body bg-info text-white rounded">
                            <h6 class="mb-1">Average Age</h6>
                            <h3 class="fw-bold">44.20</h3>
                            </div>
                        </div>
                        </div>
                    </div>

                    <!-- Charts & Stats -->
                    <div class="row g-3">
                        <div class="col-md-4">
                        <div class="card shadow-sm">
                            <div class="card-header fw-bold">Headcount by Gender</div>
                            <div class="card-body">
                            <canvas id="chart-gender"></canvas>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-4">
                        <div class="card shadow-sm">
                            <div class="card-header fw-bold">Headcount by Contract Type</div>
                            <div class="card-body">
                            <canvas id="chart-contract"></canvas>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-4">
                        <div class="card shadow-sm">
                            <div class="card-header fw-bold">Headcount by Age Group</div>
                            <div class="card-body">
                            <canvas id="chart-age"></canvas>
                            </div>
                        </div>
                        </div>

                        <div class="col-md-4">
                        <div class="card shadow-sm">
                            <div class="card-header fw-bold">Headcount by City</div>
                            <div class="card-body">
                            <canvas id="chart-city"></canvas>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-4">
                        <div class="card shadow-sm">
                            <div class="card-header fw-bold">Headcount by Department</div>
                            <div class="card-body">
                            <canvas id="chart-department"></canvas>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-4">
                        <div class="card shadow-sm">
                            <div class="card-header fw-bold">Headcount by Job Position</div>
                            <div class="card-body">
                            <canvas id="chart-position"></canvas>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer class="bg-dark text-white text-center p-2">
                <small>&copy; 2025 Workly</small>
            </footer>
        </div>
    `;

    initEmployeeDashboardEvents();
}
