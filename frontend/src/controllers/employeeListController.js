
export function initEmployeeListEvents() {
    document.getElementById('create-employee').addEventListener("click", (event) => {
        event.preventDefault();
        location.hash = '#/admin/createEmployee';
    });

/*     document.getElementById('edit-employee').addEventListener("click", (event) => {
        event.preventDefault();
        location.hash = '#/admin/editEmployee';
    }); */
}