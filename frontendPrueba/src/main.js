import { loadView } from './js/router.js';

document.addEventListener('DOMContentLoaded', async () => {
    const sidebarContainer = document.getElementById('sidebar');
    if (!sidebarContainer) return;
    
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