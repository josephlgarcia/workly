import { initEmployeeLeaveRequestEvents } from "../../controllers/employeeLeaveRequestController.js"; // import controllers that control the dashboard view

export async function showEmployeeLeaveRequest() {
    document.getElementById('employee-subview').innerHTML = `
    <h1>Solicitud de Permiso</h1>
    <form class="leave-request-form">
        <div class="form-group">
            <label for="reason">Motivo</label>
            <select id="reason" name="reason" required>
                <option value="">Selecciona un motivo</option>
                <option value="vacaciones">Vacaciones</option>
                <option value="enfermedad">Enfermedad</option>
                <option value="personal">Asunto personal</option>
            </select>
        </div>

        <div class="form-group">
            <label for="fromDate">Desde</label>
            <input type="date" id="fromDate" name="fromDate" required>
        </div>

        <div class="form-group">
            <label for="toDate">Hasta</label>
            <input type="date" id="toDate" name="toDate" required>
        </div>

        <div class="form-group">
            <label for="details">Detalles adicionales</label>
            <textarea id="details" name="details" rows="4" placeholder="Opcional..."></textarea>
        </div>

        <button type="submit">Enviar solicitud</button>
    </form>
`;

    initEmployeeLeaveRequestEvents();
}