import { initEditEmployeeEvents } from '../../controllers/editEmployeeController.js';
import { api } from '../../api/api.js';

export async function showEditEmployee() {
        document.getElementById('admin-subview').innerHTML = `
            <div class="container-fluid px-4">
            <h1 class="mt-4 text-center">Editar Empleado</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="#/admin" data-view="dashboard">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="#/admin/employeeList" data-view="employee">Empleados</a></li>
                <li class="breadcrumb-item active">Editar empleado</li>
            </ol>
    
            <div class="container border border-3 border-primary rounded p-4 mt-3 shadow">
                <form id="edit-employeeForm" class="row g-3">
                    <!-- Nombre -->
                    <div class="col-md-6">
                        <label class="form-label">Nombre</label>
                        <input id="edit-name" type="text" class="form-control" name="first_name" placeholder="Nombre" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Apellido</label>
                        <input id="edit-last-name" type="text" class="form-control" name="last_name" placeholder="Apellido" required>
                    </div>
    
                    <!-- Documento -->
                    <div class="col-md-6">
                        <label class="form-label">Número de documento</label>
                        <input id="edit-document-number" type="text" class="form-control" name="document_number" placeholder="Número de documento" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Tipo de documento</label>
                        <select id="edit-document_type" class="form-select" name="document_type" required>
                            <option selected disabled>Seleccione...</option>
                            <option value="Cedula de Ciudadania">Cédula de Ciudadanía</option>
                            <option value="Pasaporte">Pasaporte</option>
                        </select>
                    </div>
    
                    <!-- Email y Dirección -->
                    <div class="col-md-6">
                        <label class="form-label">Correo</label>
                        <input id="edit-email" type="email" class="form-control" name="email" placeholder="Correo" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Dirección</label>
                        <input id="edit-address" type="text" class="form-control" name="address" placeholder="Dirección">
                    </div>
    
                    <!-- Género y Rol -->
                    <div class="col-md-6">
                        <label class="form-label">Género</label>
                        <select id="edit-gender" class="form-select" name="gender" required>
                            <option selected disabled>Seleccione...</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Rol</label>
                        <select id="edit-role_id" class="form-select" name="role_id" required>
                            <option selected disabled>Seleccione...</option>
                            <option value="3">Administrador</option>
                            <option value="2">Empleado</option>
                        </select>
                    </div>
    
                    <!-- Cargo y Departamento -->
                    <div class="col-md-6">
                        <label class="form-label">Cargo</label>
                        <select id="edit-position_id" class="form-select" name="position_id" required>
                            <option selected disabled>Seleccione...</option>
                            <option value="1">Gerente</option>
                            <option value="2">Analista</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Departamento</label>
                        <select id="edit-departament_id" class="form-select" name="departament_id" required>
                            <option selected disabled>Seleccione...</option>
                            <option value="1">TI</option>
                            <option value="2">RRHH</option>
                        </select>
                    </div>
    
                    <!-- Ciudad -->
                    <div class="col-md-6">
                        <label class="form-label">Ciudad</label>
                        <select id="edit-city_id" class="form-select" name="city_id" required>
                            <option selected disabled>Seleccione...</option>
                            <option value="1">Bogotá</option>
                            <option value="2">Medellín</option>
                        </select>
                    </div>
    
                    <!-- Teléfonos -->
                    <div class="col-md-6">
                        <label class="form-label">Teléfono principal</label>
                        <input id="edit-phone1" type="tel" class="form-control" name="phone1" placeholder="Teléfono principal" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Teléfono alternativo (opcional)</label>
                        <input id="edit-phone2" type="tel" class="form-control" name="phone2" placeholder="Teléfono alternativo">
                    </div>
    
                    <!-- Fechas -->
                    <div class="col-md-6">
                        <label class="form-label">Fecha de inicio</label>
                        <input id="edit-start_date" type="date" class="form-control" name="start_date" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Fecha de finalización</label>
                        <input id="edit-end_date" type="date" class="form-control" name="end_date" required>
                    </div>
    
                    <!-- Salario y Contrato -->
                    <div class="col-md-6">
                        <label class="form-label">Salario</label>
                        <input id="edit-salary" type="number" class="form-control" name="salary" placeholder="Salario" required>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Tipo de contrato</label>
                        <select id="edit-contract_type" class="form-select" name="contract_type" required>
                            <option selected disabled>Seleccione...</option>
                            <option value="1">Fijo</option>
                            <option value="2">Indefinido</option>
                        </select>
                    </div>
    
                    <!-- Contraseña -->
                    <div class="col-md-6">
                        <label class="form-label">Contraseña</label>
                        <input id="edit-password" type="password" class="form-control" name="password" placeholder="Contraseña" required>
                    </div>
    
                    <!-- Botón -->
                    <div class="col-12 text-center mt-4">
                        <button type="submit" class="btn btn-primary btn-lg w-50">Editar empleado</button>
                    </div>
                </form>
                </div>
            </div>
            `;
        
    const employeeId = location.hash.split("/").pop();

    try {
        const employee = await api.getData(`http://localhost:3001/api/v1/employee/${employeeId}`);
        document.getElementById('edit-name').value = employee.first_name;
        document.getElementById('edit-last-name').value = employee.last_name;
        document.getElementById('edit-document-number').value = employee.document_number;
        document.getElementById('edit-document_type').value = employee.document_type;
        document.getElementById('edit-email').value = employee.email;
        document.getElementById('edit-address').value = employee.address;
        document.getElementById('edit-gender').value = employee.gender;
        document.getElementById('edit-role_id').value = employee.role_id;
        document.getElementById('edit-position_id').value = employee.position_id;
        document.getElementById('edit-departament_id').value = employee.departament_id;
        document.getElementById('edit-city_id').value = employee.city_id;
        document.getElementById('edit-phone1').value = employee.phones[0];
        document.getElementById('edit-phone2').value = employee.phones[1] || "";
        document.getElementById('edit-start_date').value = employee.start_date.split("T")[0];
        document.getElementById('edit-end_date').value = employee.end_date.split("T")[0];
        document.getElementById('edit-salary').value = employee.salary;
        document.getElementById('edit-contract_type').value = employee.id_contract;
        document.getElementById('edit-password').value = employee.password;

    } catch (error) {
        console.error("Error cargando empleado:", error);
        alert("No se pudo cargar el empleado");
    }

    initEditEmployeeEvents();
}