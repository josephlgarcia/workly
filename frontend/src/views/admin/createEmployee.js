import { initCreateEmployeeEvents } from "../../controllers/createEmployeeController";

export function showCreateEmployee() {
    document.getElementById('admin-subview').innerHTML = `
        <div class="container-fluid px-4">
        <h1 class="mt-4 text-center">Crear Empleado</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item"><a href="#" data-view="dashboard">Dashboard</a></li>
            <li class="breadcrumb-item"><a href="#" data-view="employee">Empleados</a></li>
            <li class="breadcrumb-item active">Crear empleado</li>
        </ol>

        <div class="container border border-3 border-primary rounded p-4 mt-3 shadow">
            <form id="employeeForm" class="row g-3">
                <!-- Nombre -->
                <div class="col-md-6">
                    <label class="form-label">Nombre</label>
                    <input type="text" class="form-control" name="first_name" placeholder="Nombre" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Apellido</label>
                    <input type="text" class="form-control" name="last_name" placeholder="Apellido" required>
                </div>

                <!-- Documento -->
                <div class="col-md-6">
                    <label class="form-label">Número de documento</label>
                    <input type="text" class="form-control" name="document_number" placeholder="Número de documento" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Tipo de documento</label>
                    <select class="form-select" name="document_type" required>
                        <option selected disabled>Seleccione...</option>
                        <option value="Cedula de Ciudadania">Cédula de Ciudadanía</option>
                        <option value="Pasaporte">Pasaporte</option>
                    </select>
                </div>

                <!-- Email y Dirección -->
                <div class="col-md-6">
                    <label class="form-label">Correo</label>
                    <input type="email" class="form-control" name="email" placeholder="Correo" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Dirección</label>
                    <input type="text" class="form-control" name="address" placeholder="Dirección">
                </div>

                <!-- Género y Rol -->
                <div class="col-md-6">
                    <label class="form-label">Género</label>
                    <select class="form-select" name="gender" required>
                        <option selected disabled>Seleccione...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Rol</label>
                    <select class="form-select" name="role_id" required>
                        <option selected disabled>Seleccione...</option>
                        <option value="3">Administrador</option>
                        <option value="2">Empleado</option>
                    </select>
                </div>

                <!-- Cargo y Departamento -->
                <div class="col-md-6">
                    <label class="form-label">Cargo</label>
                    <select class="form-select" name="position_id" required>
                        <option selected disabled>Seleccione...</option>
                        <option value="1">Gerente</option>
                        <option value="2">Analista</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Departamento</label>
                    <select class="form-select" name="departament_id" required>
                        <option selected disabled>Seleccione...</option>
                        <option value="1">TI</option>
                        <option value="2">RRHH</option>
                    </select>
                </div>

                <!-- Ciudad -->
                <div class="col-md-6">
                    <label class="form-label">Ciudad</label>
                    <select class="form-select" name="city_id" required>
                        <option selected disabled>Seleccione...</option>
                        <option value="1">Bogotá</option>
                        <option value="2">Medellín</option>
                    </select>
                </div>

                <!-- Teléfonos -->
                <div class="col-md-6">
                    <label class="form-label">Teléfono principal</label>
                    <input type="tel" class="form-control" name="phone1" placeholder="Teléfono principal" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Teléfono alternativo (opcional)</label>
                    <input type="tel" class="form-control" name="phone2" placeholder="Teléfono alternativo">
                </div>

                <!-- Fechas -->
                <div class="col-md-6">
                    <label class="form-label">Fecha de inicio</label>
                    <input type="date" class="form-control" name="start_date" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Fecha de finalización</label>
                    <input type="date" class="form-control" name="end_date" required>
                </div>

                <!-- Salario y Contrato -->
                <div class="col-md-6">
                    <label class="form-label">Salario</label>
                    <input type="number" class="form-control" name="salary" placeholder="Salario" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Tipo de contrato</label>
                    <select class="form-select" name="contract_type" required>
                        <option selected disabled>Seleccione...</option>
                        <option value="1">Fijo</option>
                        <option value="2">Indefinido</option>
                    </select>
                </div>

                <!-- Contraseña -->
                <div class="col-md-6">
                    <label class="form-label">Contraseña</label>
                    <input type="password" class="form-control" name="password" placeholder="Contraseña" required>
                </div>

                <!-- Botón -->
                <div class="col-12 text-center mt-4">
                    <button type="submit" class="btn btn-primary btn-lg w-50">Crear empleado</button>
                </div>
            </form>
            </div>
        </div>
        `;

    initCreateEmployeeEvents();
}