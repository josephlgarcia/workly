/* Importa las vistas principales */
import { showLogin } from '../views/login.js';
import { renderNotFound } from '../views/nofound.js';
import { showEmployeeDashboard } from '../views/employee/employeeDashboard.js';
import { showAdminDashboard } from '../views/admin/adminDashboard.js';

/* Importa las subvistas */
import { showEmployeeList } from '../views/admin/employeeList.js';
import { showRequestApproval } from '../views/admin/requestApproval.js';
import { showRequestHistory } from '../views/admin/requestHistory.js';
import { showCreateEmployee } from '../views/admin/createEmployee.js';
import { showEditEmployee } from '../views/admin/editEmployee.js';

import { showEmployeeContract } from '../views/employee/employeeContract.js';
import { showEmployeeDetails } from '../views/employee/employeeDetails.js';
import { showEmployeeLeaveHistory } from '../views/employee/employeeLeaveHistory.js';
import { showEmployeeLeaveRequest } from '../views/employee/employeeLeaveRequest.js';
import { showEmployeePayments } from '../views/employee/employeePayments.js';


// Rutas principales (las que van directo en #app)
const mainRoutes = {
    '#/login': showLogin,
    '#/admin': showAdminDashboard,
    '#/employee': showEmployeeDashboard,
};

// Subrutas admin (se renderizan en #admin-subview)
const adminSubRoutes = {
    '#/admin/employeeList': showEmployeeList,
    '#/admin/requestApproval': showRequestApproval,
    '#/admin/requestsHistory': showRequestHistory,
    '#/admin/createEmployee': showCreateEmployee,
    // Ojo: editEmployee es dinámico (#/admin/editEmployee/:id)
};

// Subrutas employee (se renderizan en #employee-subview)
const employeeSubRoutes = {
    '#/employee/Contract': showEmployeeContract,
    '#/employee/Details': showEmployeeDetails,
    '#/employee/LeaveHistory': showEmployeeLeaveHistory,
    '#/employee/LeaveRequest': showEmployeeLeaveRequest,
    '#/employee/Payments': showEmployeePayments,
};


let previousRoute = null;

export async function router() {
    const path = location.hash || '#/login';

    if (mainRoutes[path] || adminSubRoutes[path] || employeeSubRoutes[path] || path.startsWith('#/admin/editEmployee')) {
        previousRoute = path;
    }

    // === MAIN ROUTES ===
    if (mainRoutes[path]) {
        mainRoutes[path]();
        return;
    }

    // === ADMIN SUBROUTES ===
    if (path.startsWith('#/admin/')) {
        // Asegurar que el dashboard admin esté montado en #app
        if (!document.querySelector('#admin-subview')) {
            await showAdminDashboard();
        }

        if (adminSubRoutes[path]) {
            adminSubRoutes[path]();
            return;
        }

        if (path.startsWith('#/admin/editEmployee')) {
            showEditEmployee(); // este internamente toma el id del hash
            return;
        }
    }

    // === EMPLOYEE SUBROUTES ===
    if (path.startsWith('#/employee/')) {
        if (!document.querySelector('#employee-subview')) {
            await showEmployeeDashboard();
        }

        if (employeeSubRoutes[path]) {
            employeeSubRoutes[path]();
            return;
        }
    }

    // === NOT FOUND ===
    renderNotFound(previousRoute);
}
