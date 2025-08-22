
export async function initLoginEvents() {   // function that controls login events
    document.getElementById('form-login').addEventListener('submit', async (e) => { // we handle the form submission event
        e.preventDefault();
        try {
            location.hash = '#/employee/dashboard';
        } catch (error) {
            alert(error.message);
        }
    })
}