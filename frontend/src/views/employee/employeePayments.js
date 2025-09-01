import { api } from '../../api/api.js'

export async function showEmployeePayments() {
    document.getElementById('employee-subview').innerHTML = `
        <div class="container mt-4">
            <h1 class="mb-4">Historial de Pagos</h1>
            <div class="table-responsive">
                <table class="table table-striped table-hover align-middle">
                <thead class="table-primary">
                    <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Monto</th>
                    <th scope="col">Concepto</th>
                    <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>2025-07-31</td>
                    <td>1,200 €</td>
                    <td>Salario Julio 2025</td>
                    <td><span class="badge bg-success">Pagado</span></td>
                    </tr>
                    <tr>
                    <td>2025-06-30</td>
                    <td>1,200 €</td>
                    <td>Salario Junio 2025</td>
                    <td><span class="badge bg-success">Pagado</span></td>
                    </tr>
                    <tr>
                    <td>2025-05-31</td>
                    <td>1,200 €</td>
                    <td>Salario Mayo 2025</td>
                    <td><span class="badge bg-success">Pagado</span></td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>`;
}