// import the modules needed for the application
import { router } from './routes/router.js';

// We initialize the router when the page loads and when the hash in the URL changes
// This allows the application to respond to changes in the URL and display the corresponding views
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);