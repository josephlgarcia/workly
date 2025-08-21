
import { loadDynamicStyle } from "../../utils/styleManager.js";
import { initAdminDashboardEvents } from "../../controllers/adminDashboardController.js";

export async function showAdminDashboard() {
    document.getElementById('app').innerHTML = `
    <h1>adminDashboard</h1>`


    loadDynamicStyle('./src/styles/adminDashboard.css', 'adminDashboard');
    initAdminDashboardEvents();
}