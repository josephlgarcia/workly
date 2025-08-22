import { initEmployeePaymentsEvents } from "../../controllers/employeePaymentsController.js"; // import controllers that control the dashboard view
import { loadDynamicStyle } from "../../utils/styleManager.js"; // import function that controls dynamic CSS

export async function showEmployeePayments() {
    document.getElementById('employee-subview').innerHTML = `
    <h1>Historial de Pagos</h1>
    <table class="payments-table">
        <thead>
            <tr>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Concepto</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>2025-07-31</td>
                <td>1,200 €</td>
                <td>Salario Julio 2025</td>
                <td><span class="status paid">Pagado</span></td>
            </tr>
            <tr>
                <td>2025-06-30</td>
                <td>1,200 €</td>
                <td>Salario Junio 2025</td>
                <td><span class="status paid">Pagado</span></td>
            </tr>
            <tr>
                <td>2025-05-31</td>
                <td>1,200 €</td>
                <td>Salario Mayo 2025</td>
                <td><span class="status paid">Pagado</span></td>
            </tr>
        </tbody>
    </table>
`;


    loadDynamicStyle('./src/styles/employeePayments.css', 'employeePayments', ['employeeDashboard']);
    initEmployeePaymentsEvents();
}