
export function renderNotFound(prevRoute) {
    document.getElementById('app').innerHTML = `
        <h2>Error 404. Página no encontrada</h2>
        <a href="${prevRoute || '#/login'}" data-link>Volver</a>`;
    
}