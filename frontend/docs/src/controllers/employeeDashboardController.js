
export async function initEmployeeDashboardEvents(){    // function that controls dashboard events
    document.querySelectorAll('a[data-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            location.hash = e.target.getAttribute('href');
        });
    });
}