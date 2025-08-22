
import { initEmployeeDetailsEvents } from "../../controllers/employeeDetailsController.js"; // import controllers that control the dashboard view
import { loadDynamicStyle } from "../../utils/styleManager.js"; // import function that controls dynamic CSS

export async function showEmployeeDetails() {
    document.getElementById('employee-subview').innerHTML = `
    <h1>Información Personal</h1>
    <div class="details-container">
        <div class="detail-item">
            <span class="label">Nombre completo:</span>
            <span class="value">Ana García Martínez</span>
        </div>
        <div class="detail-item">
            <span class="label">Correo electrónico:</span>
            <span class="value">ana.garcia@email.com</span>
        </div>
        <div class="detail-item">
            <span class="label">Teléfono:</span>
            <span class="value">+34 612 345 678</span>
        </div>
        <div class="detail-item">
            <span class="label">Dirección:</span>
            <span class="value">Calle Mayor 123, Madrid, España</span>
        </div>
        <div class="detail-item">
            <span class="label">DNI/NIE:</span>
            <span class="value">12345678Z</span>
        </div>
        <div class="detail-item">
            <span class="label">Fecha de nacimiento:</span>
            <span class="value">1990-05-14</span>
        </div>
    </div>
`;


    loadDynamicStyle('./src/styles/employeeDetails.css', 'employeeDetails', ['employeeDashboard']);
    initEmployeeDetailsEvents();
}