
import { initAdminDashboardEvents } from "../../controllers/adminDashboardController.js";

export function showAdminDashboard() {
    document.getElementById('app').innerHTML = `
    <div class="d-flex flex-column vh-100">
        <header class="bg-primary text-white p-3">
            <h1>Workly</h1>
        </header>

        <main class="d-flex flex-grow-1">
            <div id="sidebar" style="width: 250px;">
            <aside class="d-flex flex-column flex-shrink-0 p-3 bg-light h-100">
                <span class="fs-4">Menú Administrador</span>
                <hr>
                <ul class="nav nav-pills flex-column mb-auto">
                    <li class="nav-item">
                    <a href="#/admin" class="nav-link link-dark" aria-current="page" data-view="dashboard">
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
            <div id="admin-subview" class="flex-grow-1 overflow-auto p-3">
                <div class="row">

                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div
                                            class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Empleados activos</div>
                                        <div
                                            class="h5 mb-0 font-weight-bold text-gray-800">x</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-success shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div
                                            class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                            Nuevas citas</div>
                                        <div
                                            class="h5 mb-0 font-weight-bold text-gray-800">x</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-info shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div
                                            class="text-xs font-weight-bold text-info text-uppercase mb-1">Citas Pendientes
                                        </div>
                                        <div class="row no-gutters align-items-center">
                                            <div class="col-auto">
                                                <div
                                                    class="h5 mb-0 mr-3 font-weight-bold text-gray-800">x</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-auto">
                                        <i
                                            class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-warning shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div
                                            class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                            Citas activas</div>
                                        <div
                                            class="h5 mb-0 font-weight-bold text-gray-800">x</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-comments fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <footer class="bg-dark text-white text-center p-2">
            <small>&copy; 2025.</small>
        </footer>
    </div>
`;


    initAdminDashboardEvents();
}
