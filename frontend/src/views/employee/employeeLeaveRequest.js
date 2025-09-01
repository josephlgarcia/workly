import { initEmployeeLeaveRequestEvents } from "../../controllers/employeeLeaveRequestController.js"; // import controllers that control the dashboard view
import { api } from "../../api/api.js";

export async function showEmployeeLeaveRequest() {
    document.getElementById('employee-subview').innerHTML = `
        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <div class="card shadow-sm border-0">
                        <div class="card-body">
                            <h2 class="text-center mb-4 text-primary">
                                <i class="bi bi-file-earmark-text-fill me-2"></i>Solicitud de Permiso
                            </h2>

                            <form id="leaveForm" class="row g-3" enctype="multipart/form-data">
                                <div class="col-12">
                                    <label for="employee_id" class="form-label">ID del Empleado</label>
                                    <p id="employee_id"></p>
                                </div>

                                <div class="col-12">
                                    <label for="leave_type_id" class="form-label">Tipo de Permiso</label>
                                    <select id="leave_type_id" name="leave_type_id" required class="form-select">
                                        <option value="">Cargando tipos de permiso...</option>
                                    </select>
                                </div>

                                <div class="col-md-6">
                                    <label for="start_day" class="form-label">Fecha de Inicio</label>
                                    <input type="date" id="start_day" name="start_day" required class="form-control">
                                </div>

                                <div class="col-md-6">
                                    <label for="end_day" class="form-label">Fecha de Fin</label>
                                    <input type="date" id="end_day" name="end_day" required class="form-control">
                                </div>

                                <div class="col-12">
                                    <label for="description" class="form-label">Descripción</label>
                                    <textarea id="description" name="description" rows="3" required class="form-control"></textarea>
                                </div>

                                <div class="col-12">
                                    <label for="leave_file" class="form-label">Archivo Adjunto (Opcional)</label>
                                    <input type="file" id="leave_file" name="leave_file" class="form-control">
                                </div>

                                <input type="hidden" name="leave_status_id" value="3">

                                <div class="col-12">
                                    <button type="submit" class="btn btn-success w-100">
                                        <i class="bi bi-send-fill me-2"></i>Enviar Solicitud
                                    </button>
                                </div>
                            </form>

                            <div id="message" class="mt-3 text-center"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        document.getElementById('employee_id').textContent = user.id;

        const selectLeaveType = document.querySelector('#leave_type_id');
        if (selectLeaveType) {
            selectLeaveType.innerHTML = '<option value="">Seleccione un tipo de permiso</option>';

            const leaveTypes = await api.getData('http://localhost:3001/api/v1/leaves-type');

            leaveTypes.forEach(type => {
                const option = document.createElement('option');
                option.value = type.id_leave_type;
                option.textContent = type.name;
                selectLeaveType.appendChild(option);
            });
        }

    } catch (error) {
        console.error('Error in loadEmployeeLeaveRequestView:', error);
    }


    initEmployeeLeaveRequestEvents();
}