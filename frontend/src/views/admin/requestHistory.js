import { api } from '../../api/api.js';

export async function showRequestHistory() {
    document.getElementById('admin-subview').innerHTML = `
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    Tabla de Solicitudes de Permiso
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table id="leaves-table" class="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID Solicitud</th>
                                    <th>Nombre Empleado</th>
                                    <th>Tipo de Permiso</th>
                                    <th>Estado</th>
                                    <th>Fecha Inicio</th>
                                    <th>Fecha Fin</th>
                                    <th>Descripción</th>
                                    <th>Última actualización</th>
                                </tr>
                            </thead>
                        <tbody id="leaves-table-body"></tbody>
                    </table>
                </div>
            </div>`;
    
        try {
            const leaves = await api.getData('http://localhost:3001/api/v1/leave');
            const tableBody = document.querySelector('#leaves-table-body');
    
            if (tableBody) {
                tableBody.innerHTML = '';
    
                leaves.forEach(leave => {
                    const row = document.createElement('tr');
    
                    const statusText = leave.leave_status_id === 1 ? 'Aprobado' : 'Rechazado';
                    const classStatus = leave.leave_status_id === 1 ? 'success' : 'danger';
    
                    row.innerHTML = `
                        <td>${leave.id_leave}</td>
                        <td>${leave.first_name} ${leave.last_name}</td>
                        <td>${leave.leaves_type}</td>
                        <td><span class="badge bg-${classStatus}">${statusText}</span></td>
                        <td>${leave.start_day}</td>
                        <td>${leave.end_day}</td>
                        <td>${leave.description}</td>
                        <td>${leave.update ?? 'NA'}</td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        } catch (error) {
            console.error('Error al cargar la vista de solicitudes de permiso:', error);
        }
}