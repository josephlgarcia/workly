import { renderEmployeeView } from './employee.js';
import { renderLeaveView } from './leave.js';
import { initializeLeavesView } from './leaves.js';

const routes = {
    dashboard: async () => {
        const app = document.getElementById('app');
        if (!app) return;
        const response = await fetch('/src/views/dashboard.html');
        const html = await response.text();
        app.innerHTML = html;
        // Ahora, después de cargar el HTML, inicializamos la vista.
        initializeLeavesView();
    },
    employee: renderEmployeeView,
    leave: renderLeaveView,
    leaves: async () => {
        const app = document.getElementById('app');
        if (!app) return;
        const response = await fetch('/src/views/leaves.html');
        const html = await response.text();
        app.innerHTML = html;
        initializeLeavesView();
    }
};

export async function loadView(viewName) {
    const app = document.getElementById('app');
    if (!app) {
        console.error("Error: Elemento con id='app' no encontrado.");
        return;
    }
    
    try {
        const renderFunction = routes[viewName];
        if (renderFunction) {
            await renderFunction();
        } else {
            const response = await fetch(`/src/views/${viewName}.html`);
            const viewHTML = await response.text();
            app.innerHTML = viewHTML;
        }
    } catch (error) {
        console.error(`Error al cargar la vista ${viewName}:`, error);
        app.innerHTML = '<p class="text-danger">Error al cargar la vista. Por favor, intente de nuevo.</p>';
    }
}
