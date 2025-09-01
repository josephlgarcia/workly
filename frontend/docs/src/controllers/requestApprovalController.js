import { api } from "../api/api.js";

async function handleApproveLeave(e) {
    if (e.target.closest(".btn-approve-leave")) {
        const btn = e.target.closest(".btn-approve-leave");
        const leaveId = btn.dataset.id;

        if (confirm("¿Seguro que deseas aprobar esta solicitud de permiso?")) {
            try {
                const response = await api.putData(`http://localhost:3001/api/v1/leave/${leaveId}`, {
                    "leave_status_id": 1
                });
                alert(response.message || "Permiso aprobado correctamente");
                location.reload();
            } catch (error) {
                console.error("Error al aprobar permiso:", error);
                alert("No se pudo aprobar el permiso.");
            }
        }
    }
}

async function handleDisapproveLeave(e) {
    if (e.target.closest(".btn-disapprove-leave")) {
        const btn = e.target.closest(".btn-disapprove-leave");
        const leaveId = btn.dataset.id;

        if (confirm("¿Seguro que deseas rechazar esta solicitud de permiso?")) {
            try {
                const response = await api.putData(`http://localhost:3001/api/v1/leave/${leaveId}`, {
                    "leave_status_id": 2
                });
                alert(response.message || "Permiso rechazado correctamente");
                location.reload();
            } catch (error) {
                console.error("Error al rechazar permiso:", error);
                alert("No se pudo rechazar el permiso.");
            }
        }
    }
}

export function initRequestApprovalEvents() {
    document.removeEventListener("click", handleApproveLeave);
    document.addEventListener("click", handleApproveLeave);

    document.removeEventListener("click", handleDisapproveLeave);
    document.addEventListener("click", handleDisapproveLeave);
}
