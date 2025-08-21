import { initEmployeePaymentsEvents } from "../../controllers/employeePaymentsController.js"; // import controllers that control the dashboard view
import { loadDynamicStyle } from "../../utils/styleManager.js"; // import function that controls dynamic CSS

export async function showEmployeePayments() {
    document.getElementById('app').innerHTML = `
    <h1>employeePayments</h1>`

    loadDynamicStyle('./src/styles/employeePayments.css', 'employeePayments');
    initEmployeePaymentsEvents();
}