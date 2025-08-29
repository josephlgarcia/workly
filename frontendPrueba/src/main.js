import { getAllEmployees } from './api/employee.js';

async function loadEmployeeView() {
  const app = document.getElementById('app');

  try {
    const response = await fetch('/src/views/employee.html');
    const viewHTML = await response.text();
    app.innerHTML = viewHTML;

    const employees = await getAllEmployees();
    console.log('Datos de empleados:', employees);

    const tableBody = document.querySelector('#employee-table-body');
    if (tableBody) {
      tableBody.innerHTML = '';
      employees.forEach(employee => {
        const row = document.createElement('tr');
        const status = employee.status === 1 ? 'Active' : 'Inactive';
        const classStatus = employee.status === 1 ? 'success' : 'danger';
        row.innerHTML = `
                    <td>${employee.full_name}</td>
                    <td>${employee.document_number}</td>
                    <td>${employee.id_contract}</td>
                    <td>${employee.start_date}</td>
                    <td>${employee.end_date}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.contract_type_name}</td>
                    <td><span class="p-2 rounded text-white bg-${classStatus}">${status}</span></td>
                `;
        tableBody.appendChild(row);
      });
    }
  } catch (error) {
    app.innerHTML = '<p class="text-danger">Error al cargar los datos. Por favor, intente de nuevo.</p>';
    console.error('Error in loadEmployeeView:', error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const sidebarContainer = document.getElementById('sidebar');
  const app = document.getElementById('app');

  try {
    const response = await fetch('/src/views/sidebar.html');
    const sidebarHTML = await response.text();
    sidebarContainer.innerHTML = sidebarHTML;
  } catch (error) {
    console.error('Error al cargar el sidebar:', error);
  }

  loadView('dashboard');
});

document.addEventListener('click', (event) => {
  const link = event.target.closest('[data-view]');
  if (link) {
    event.preventDefault();
    const viewName = link.getAttribute('data-view');
    loadView(viewName);
  }
});

window.addEventListener('popstate', (event) => {
  if (event.state && event.state.view) {
    loadView(event.state.view);
  }
});

async function loadView(viewName) {
  if (viewName === 'employee') {
    loadEmployeeView();
  } else {
    const app = document.getElementById('app');
    try {
      const response = await fetch(`/src/views/${viewName}.html`);
      const viewHTML = await response.text();
      app.innerHTML = viewHTML;
    } catch (error) {
      console.error(`Error al cargar la vista ${viewName}:`, error);
    }
  }
}
