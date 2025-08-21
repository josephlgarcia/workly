
import { initDashboardEvents } from "../controllers/dashboardController.js"; // import controllers that control the dashboard view
import { loadDynamicStyle } from "../utils/styleManager.js"; // import function that controls dynamic CSS

export async function showDashboard() {
    document.getElementById('app').innerHTML = `
    <h1>Dashboard</h1>`

    loadDynamicStyle('./src/styles/dashboard.css', 'dashboard');
    initDashboardEvents();
}