
import { initEmployeeDashboardEvents } from "../../controllers/employeeDashboardController.js"; // import controllers that control the dashboard view
import { loadDynamicStyle } from "../../utils/styleManager.js"; // import function that controls dynamic CSS

export async function showEmployeeDashboard() {
    document.getElementById('app').innerHTML = `
    <h1>employeeDashboard</h1>`

    loadDynamicStyle('./src/styles/employeeDashboard.css', 'dashboard');
    initEmployeeDashboardEvents();
}