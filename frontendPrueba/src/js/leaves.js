import { getAllLeaves, updateLeaveStatus, getLeavesByEmployeeId } from '../api/leaves.js';
import { getCurrentUser } from './auth.js';
import { loadView } from './router.js';

let allLeaves = []; 
const CANCELED_STATUS_ID = 5;

const handleButtonClick = async (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    const leaveId = button.dataset.leaveId;
    const action = button.dataset.action;

    if (action === 'cancel') {
        if (confirm('¿Estás seguro de que quieres cancelar esta solicitud?')) {
            try {
                await updateLeaveStatus(leaveId, CANCELED_STATUS_ID);
                alert('Solicitud cancelada con éxito!');
                fetchAndRenderLeaves();
            } catch (error) {
                console.error('Error al cancelar la solicitud:', error);
                alert('Error al cancelar la solicitud.');
            }
        }
    } else if (action === 'modify') {
        loadView(`leave?id=${leaveId}`);
    }
};


const renderTable = (leavesToRender) => {
    const tableBody = document.querySelector('#leaves-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    if (leavesToRender.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="9" class="text-center">No se encontraron solicitudes.</td></tr>';
        return;
    }

    const currentUser = getCurrentUser();

    leavesToRender.forEach(leave => {
        const row = document.createElement('tr');
        const isOngoing = leave.leave_status_id === 3;
        
        let statusClass = '';
        switch (leave.status) {
            case 'Approved': statusClass = 'success'; break;
            case 'Rejected': statusClass = 'danger'; break;
            case 'In progress': statusClass = 'warning'; break;
            case 'Completed': statusClass = 'info'; break;
            case 'Canceled': statusClass = 'secondary'; break;
            default: statusClass = 'secondary';
        }

        let actionButtons = '';
        if (currentUser.role_id === 2 && isOngoing) {
            actionButtons = `
                <button class="btn btn-sm btn-success m-1" data-leave-id="${leave.id_leave}" data-action="approve">Aprobar</button>
                <button class="btn btn-sm btn-danger m-1" data-leave-id="${leave.id_leave}" data-action="reject">Rechazar</button>
            `;
        } else if (currentUser.role_id === 1 && isOngoing) {
            actionButtons = `
                <button class="btn btn-sm btn-primary m-1" data-leave-id="${leave.id_leave}" data-action="modify">Modificar</button>
                <button class="btn btn-sm btn-secondary m-1" data-leave-id="${leave.id_leave}" data-action="cancel">Cancelar</button>
            `;
        }
        
        row.innerHTML = `
            <td>${leave.id_leave}</td>
            <td>${leave.first_name} ${leave.last_name}</td>
            <td>${leave.leaves_type}</td>
            <td><span class="badge bg-${statusClass}">${leave.status}</span></td>
            <td>${leave.start_day}</td>
            <td>${leave.end_day}</td>
            <td>${leave.description}</td>
            <td>${actionButtons}</td>
        `;
        tableBody.appendChild(row);
    });

    const approveButtons = document.querySelectorAll('button[data-action="approve"]');
    approveButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const leaveId = button.dataset.leaveId;
            try {
                await updateLeaveStatus(leaveId, 1); 
                alert('Solicitud aprobada con éxito!');
                fetchAndRenderLeaves();
            } catch (error) {
                console.error('Error al aprobar la solicitud:', error);
                alert('Error al aprobar la solicitud.');
            }
        });
    });

    const rejectButtons = document.querySelectorAll('button[data-action="reject"]');
    rejectButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const leaveId = button.dataset.leaveId;
            try {
                await updateLeaveStatus(leaveId, 2);
                alert('Solicitud rechazada con éxito!');
                fetchAndRenderLeaves();
            } catch (error) {
                console.error('Error al rechazar la solicitud:', error);
                alert('Error al rechazar la solicitud.');
            }
        });
    });
    
    // Add a single listener to the table body for the new user buttons
    tableBody.addEventListener('click', handleButtonClick);
};

const filterLeaves = () => {
    const typeFilter = document.getElementById('type-filter');
    const statusFilter = document.getElementById('status-filter');
    const startDateFilter = document.getElementById('start-date-filter');
    const endDateFilter = document.getElementById('end-date-filter');

    const typeValue = typeFilter ? typeFilter.value.toLowerCase() : '';
    const statusValue = statusFilter ? statusFilter.value : '';
    const startDateValue = startDateFilter ? startDateFilter.value : '';
    const endDateValue = endDateFilter ? endDateFilter.value : '';

    const filteredLeaves = allLeaves.filter(leave => {
        const matchesType = leave.leaves_type.toLowerCase().includes(typeValue);
        const matchesStatus = statusValue === '' || leave.status === statusValue;
        const matchesStartDate = startDateValue === '' || leave.start_day >= startDateValue;
        const matchesEndDate = endDateValue === '' || leave.end_day <= endDateValue;
        return matchesStatus && matchesType && matchesStartDate && matchesEndDate;
    });

    renderTable(filteredLeaves);
};

export async function fetchAndRenderLeaves() {
    try {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            console.error("No se encontró un usuario en el localStorage.");
            return;
        }

        if (currentUser.role_id === 2) {
            allLeaves = await getAllLeaves();
        } else if (currentUser.role_id === 1) {
            allLeaves = await getLeavesByEmployeeId(currentUser.id_employee);
        }

        renderTable(allLeaves);
    } catch (error) {
        document.querySelector('#leaves-table-body').innerHTML = `<tr><td colspan="9" class="text-center text-danger">Error al cargar los datos.</td></tr>`;
        console.error('Error fetching leaves:', error);
    }
}

export function initializeLeavesView() {
    fetchAndRenderLeaves();
    const typeFilter = document.getElementById('type-filter');
    const statusFilter = document.getElementById('status-filter');
    const startDateFilter = document.getElementById('start-date-filter');
    const endDateFilter = document.getElementById('end-date-filter');

    if (typeFilter) typeFilter.addEventListener('keyup', filterLeaves);
    if (statusFilter) statusFilter.addEventListener('change', filterLeaves);
    if (startDateFilter) startDateFilter.addEventListener('change', filterLeaves);
    if (endDateFilter) endDateFilter.addEventListener('change', filterLeaves);
}
