import { loadDynamicStyle } from "../utils/styleManager.js";    // import function that controls dynamic CSS
import { initLoginEvents } from "../controllers/loginController.js";    // import controllers that control the dashboard view

export async function showLogin() {
    document.getElementById('app').innerHTML = `
        <div class="login-container">
            <form id="form-login" class="login-form card">
                <h2">Login</h2>
                <input type="text" id="document" placeholder="número de documento" required>
                <input type="password" id="password" placeholder="contraseña" required>
                <button type:"submit" >Entrar</button>
            </form>
        </div>`;
    
    loadDynamicStyle('./src/styles/login.css', 'login');
    initLoginEvents();
}