import { initEmployeeLeaveRequestEvents } from "../../controllers/employeeLeaveRequestController.js"; // import controllers that control the dashboard view
import { loadDynamicStyle } from "../../utils/styleManager.js"; // import function that controls dynamic CSS

export async function showEmployeeLeaveRequest() {
    document.getElementById('app').innerHTML = `
    <h1>employeeLeaveRequest</h1>`

    loadDynamicStyle('./src/styles/employeeLeaveRequest.css', 'employeeLeaveRequest');
    initEmployeeLeaveRequestEvents();
}