
import { initEmployeeDetailsEvents } from "../../controllers/employeeDetailsController.js"; // import controllers that control the dashboard view
import { loadDynamicStyle } from "../../utils/styleManager.js"; // import function that controls dynamic CSS

export async function showEmployeeDetails() {
    document.getElementById('app').innerHTML = `
    <h1>employeeDetails</h1>`

    loadDynamicStyle('./src/styles/employeeDetails.css', 'employeeDetails');
    initEmployeeDetailsEvents();
}