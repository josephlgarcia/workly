
/* Import the view functions responsible for rendering the different sections of the application */
import { showLogin } from '../views/login.js';
import { renderNotFound } from '../views/nofound.js';
import { showDashboard } from '../views/dashboard.js';


/* We define the application routes and associate them with the corresponding view functions */
const routes = {
    '#/login': showLogin,
    '#/dashboard': showDashboard,
}


// Variable to store the previous path, useful for redirects or navigation
let previousRoute = null;

/* Main function of the router that handles navigation between different views */
export function router() {
    const path = location.hash || '#/login';

    // If the path is valid, we render the corresponding view; otherwise, we display a 404 error view.
    const view = routes[path];
    if (view) {
        view();
        previousRoute = path;
    } else {
        renderNotFound(previousRoute);
    }
}