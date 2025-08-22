
/* Import the view functions responsible for rendering the different sections of the application */
import { showLogin } from '../views/login.js';
import { renderNotFound } from '../views/nofound.js';
import { showEmployeeDashboard } from '../views/employee/employeeDashboard.js';
import { showAdminDashboard } from '../views/admin/adminDashboard.js';
import { showEmployeeList } from '../views/admin/employeeList.js';
import { showRequestApproval } from '../views/admin/requestApproval.js';
import { showRequestHistory } from '../views/admin/requestHistory.js';
import { showEmployeeContract } from '../views/employee/employeeContract.js';
import { showEmployeeDetails } from '../views/employee/employeeDetails.js';
import { showEmployeeLeaveHistory } from '../views/employee/employeeLeaveHistory.js';
import { showEmployeeLeaveRequest } from '../views/employee/employeeLeaveRequest.js';
import { showEmployeePayments } from '../views/employee/employeePayments.js';

/* We define the application routes and associate them with the corresponding view functions */
const routes = {
    '#/login': showLogin,
    '#/employee': showEmployeeDashboard,
    '#/admin': showAdminDashboard,
    '#/admin/employeeList': showEmployeeList,
    '#/admin/requestApproval': showRequestApproval,
    '#/admin/requestsHistory': showRequestHistory,
    '#/employee/Contract': showEmployeeContract,
    '#/employee/Details': showEmployeeDetails,
    '#/employee/LeaveHistory': showEmployeeLeaveHistory,
    '#/employee/LeaveRequest': showEmployeeLeaveRequest,
    '#/employee/Payments': showEmployeePayments
}


// Variable to store the previous path, useful for redirects or navigation
let previousRoute = null;

/* Main function of the router that handles navigation between different views */
export function router() {
    const path = location.hash || '#/login';

    // If the path is valid, we render the corresponding view; otherwise, we display a 404 error view.
    const view = routes[path];
    if (view) {
        view();
        previousRoute = path;
    } else {
        renderNotFound(previousRoute);
    }
}