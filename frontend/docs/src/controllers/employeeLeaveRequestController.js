import { api } from "../api/api";

export async function initEmployeeLeaveRequestEvents() {
    document.getElementById('leaveForm').addEventListener("submit", async(event) => {
        event.preventDefault();

        const $employeeId = document.getElementById('employee_id').textContent;

        const leave = {
            "employee_id": $employeeId,
            "leave_status_id": 1,
            "leave_type_id": event.target.leave_type_id.value,
            "start_day": event.target.start_day.value,
            "end_day": event.target.end_day.value,
            "description": event.target.description.value
        }

        console.log(leave);
        

        try {
            const response = await api.postData('http://localhost:3001/api/v1/leave', leave);
            
            console.log("Respuesta del servidor:", response);

            alert(response.message || "Permiso creado con éxito ✅");
            location.hash = '#/employee';
            
        } catch (error) {
            console.error("Error en la petición:", error);
            alert("Error de conexión con el servidor.");
        }
    });
}