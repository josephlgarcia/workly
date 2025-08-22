import { loadDynamicStyle } from "../../utils/styleManager.js";
import { initEmployeeContractEvents } from "../../controllers/employeeContractController.js";

export async function showEmployeeContract() {
    document.getElementById('employee-subview').innerHTML = `
    <h1>Datos del Contrato</h1>
    <div class="contract-info">
        <div class="contract-item">
            <span class="label">ID Contrato:</span>
            <span class="value">CT-0001</span>
        </div>
        <div class="contract-item">
            <span class="label">Cargo:</span>
            <span class="value">Desarrollador Web</span>
        </div>
        <div class="contract-item">
            <span class="label">Fecha de inicio:</span>
            <span class="value">2023-01-15</span>
        </div>
        <div class="contract-item">
            <span class="label">Tipo de contrato:</span>
            <span class="value">Indefinido</span>
        </div>
        <div class="contract-item">
            <span class="label">Jornada:</span>
            <span class="value">Tiempo completo</span>
        </div>
        <div class="contract-item">
            <span class="label">Salario mensual:</span>
            <span class="value">$1,200 USD</span>
        </div>
    </div>
    `;



    loadDynamicStyle('./src/styles/employeeContract.css', 'employeeContract', ['employeeDashboard']);
    initEmployeeContractEvents();
}