
import { initEmployeeLeaveHistoryEvents } from "../../controllers/employeeLeaveHistoryController.js"; // import controllers that control the dashboard view
import { loadDynamicStyle } from "../../utils/styleManager.js"; // import function that controls dynamic CSS

export async function showEmployeeLeaveHistory() {
    document.getElementById('app').innerHTML = `
    <h1>employeeLeaveHistory</h1>`

    loadDynamicStyle('./src/styles/employeeLeaveHistory.css', 'employeeLeaveHistory');
    initEmployeeLeaveHistoryEvents();
}