import { api } from "../../api/api";

export async function showEmployeeLeaveHistory() {
    document.getElementById('employee-subview').innerHTML = `
    <div class="container py-4">
    <h1 class="mb-4">Historial de Permisos</h1>

    <div class="table-responsive">
        <table class="table table-striped table-bordered text-center align-middle">
        <thead class="table-light">
            <tr>
            <th>ID</th>
            <th>Motivo</th>
            <th>Desde</th>
            <th>Hasta</th>
            <th>Días</th>
            <th>Estado</th>
            </tr>
        </thead>
        <tbody id="leaves-table-body">
            
        </tbody>
        </table>
    </div>
    </div>`;

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const leaves = await api.getData(`http://localhost:3001/api/v1/leave/employee/${user.id}`);

            if (!leaves) {
                alert("no existen permisos aún");
                location.hash = '#/employee';
            }

            const tableBody = document.querySelector('#leaves-table-body');
            if (tableBody) {
                tableBody.innerHTML = '';
                leaves.forEach(leave => {
                    const status = leave.leave_status_id === 1 ? 'Aprobado' : 'Rechazado';
                    const classStatus = leave.leave_status_id === 1 ? 'success' : 'danger';

                    const start_day = new Date(leave.start_day.split("T")[0]);
                    const end_day = new Date(leave.end_day.split("T")[0]);
                    const subtraction = end_day.getTime() - start_day.getTime();
                    const days = Math.round(subtraction/(1000*60*60*24));
    
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${leave.id_leave}</td>
                        <td>${leave.leaves_type}</td>
                        <td>${leave.start_day.split("T")[0]}</td>
                        <td>${leave.end_day.split("T")[0]}</td>
                        <td>${days}</td>
                        <td><span class="badge bg-${classStatus}">${status}</span></td>`;
                    tableBody.appendChild(row);
                });
            }
        } catch (error) {
            console.error('Error in loadleaveView:', error);
        }

}