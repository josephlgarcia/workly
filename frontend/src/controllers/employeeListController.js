import { api } from "../api/api";

async function handleDeleteEmployee(e) {
    if (e.target.closest(".btn-delete-employee")) {
        const btn = e.target.closest(".btn-delete-employee");
        const employeeId = btn.dataset.id;

        if (confirm("¿Seguro que quieres eliminar este empleado?")) {
            try {
                const response = await api.deleteData(`http://localhost:3001/api/v1/employee/${employeeId}`);
                alert(response.message || "Empleado eliminado");

                location.reload();
            } catch (error) {
                console.error("Error al eliminar:", error);
                alert("No se pudo eliminar el empleado");
            }
        }
    }
};

export function initEmployeeListEvents() {
    document.querySelectorAll('a[data-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            location.hash = e.target.getAttribute('href');
        });
    });

    document.removeEventListener("click", handleDeleteEmployee);
    document.addEventListener("click", handleDeleteEmployee);
}