import { api } from '../api/api.js';

export async function initCreateEmployeeEvents() {    
    document.getElementById("employeeForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const employeePayload = {
            employeeData: {
            role_id: event.target.role_id.value,
            position_id: event.target.position_id.value,
            departament_id: event.target.departament_id.value,
            city_id: event.target.city_id.value,
            document_type: event.target.document_type.value,
            first_name: event.target.first_name.value,
            last_name: event.target.last_name.value,
            document_number: event.target.document_number.value,
            address: event.target.address.value,
            email: event.target.email.value,
            gender: event.target.gender.value,
            vacation_days_available: 15,
            password: event.target.password.value
            },
            phoneNumbers: [
            event.target.phone1.value,
            event.target.phone2.value
            ].filter(p => p && p.trim() !== ""), // opcional
            contractData: {
            id_contract_type: event.target.contract_type.value,
            id_contract_status: 1, // Activo por defecto
            start_date: event.target.start_date.value,
            end_date: event.target.end_date.value,
            salary: event.target.salary.value
            }
        };

        try {
            const response = await fetch("http://localhost:3001/api/v1/employee", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employeePayload),
            });

            const data = await response.json();
            if (response.ok) {
            alert("Empleado creado con éxito ✅");
            } else {
            alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            alert("Error de conexión con el servidor.");
        }
    });
}
