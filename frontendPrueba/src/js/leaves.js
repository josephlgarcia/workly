import { getAllLeaves } from '../api/leaves.js';

let allLeaves = []; 

const renderTable = (leavesToRender) => {
    const tableBody = document.querySelector('#leaves-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    if (leavesToRender.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="text-center">No se encontraron solicitudes.</td></tr>';
        return;
    }

    leavesToRender.forEach(leave => {
        const row = document.createElement('tr');
        const status = leave.status;
        let classStatus = '';
        switch (status) {
            case 'Approved':
                classStatus = 'success';
                break;
            case 'Rejected':
                classStatus = 'danger';
                break;
            case 'In progress':
                classStatus = 'warning';
                break;
            case 'Completed':
                classStatus = 'info';
                break;
            case 'Canceled':
                classStatus = 'secondary';
                break;
            default:
                classStatus = 'secondary';
        }
        
        row.innerHTML = `
            <td>${leave.id_leave}</td>
            <td>${leave.first_name} ${leave.last_name}</td>
            <td>${leave.leaves_type}</td>
            <td><span class="p-2 rounded text-white bg-${classStatus}">${status}</span></td>
            <td>${leave.start_day}</td>
            <td>${leave.end_day}</td>
            <td>${leave.description}</td>
        `;
        tableBody.appendChild(row);
    });
};

const filterLeaves = () => {
    const statusFilter = document.getElementById('status-filter').value;
    const typeFilter = document.getElementById('type-filter').value.toLowerCase();
    
    const startDateFilter = document.getElementById('start-date-filter').value;
    const endDateFilter = document.getElementById('end-date-filter').value;

    const filteredLeaves = allLeaves.filter(leave => {
        const matchesStatus = statusFilter === 'all' || leave.status === statusFilter;
        const matchesType = leave.leaves_type.toLowerCase().includes(typeFilter);
        
        const leaveStartDate = new Date(leave.start_day);
        const filterStart = startDateFilter ? new Date(startDateFilter) : null;
        const filterEnd = endDateFilter ? new Date(endDateFilter) : null;
        
        let matchesDate = true;
        if (filterStart) {
            matchesDate = matchesDate && leaveStartDate >= filterStart;
        }
        if (filterEnd) {
            matchesDate = matchesDate && leaveStartDate <= filterEnd;
        }

        return matchesStatus && matchesType && matchesDate;
    });

    renderTable(filteredLeaves);
};

export async function renderLeavesView() {
    const app = document.getElementById('app');
    if (!app) return;

    try {
        const response = await fetch('/src/views/leaves.html');
        const viewHTML = await response.text();
        app.innerHTML = viewHTML;

        allLeaves = await getAllLeaves();
        renderTable(allLeaves);

        document.getElementById('type-filter').addEventListener('keyup', filterLeaves);
        document.getElementById('status-filter').addEventListener('change', filterLeaves);
        document.getElementById('start-date-filter').addEventListener('change', filterLeaves);
        document.getElementById('end-date-filter').addEventListener('change', filterLeaves);

    } catch (error) {
        app.innerHTML = '<p class="text-danger">Error al cargar los datos. Por favor, intente de nuevo.</p>';
        console.error('Error in renderLeavesView:', error);
    }
}