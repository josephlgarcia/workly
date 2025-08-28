import { api } from "../api/api.js";

export async function initLoginEvents() {
    document.getElementById('form-login').addEventListener('submit', async (e) => {
        e.preventDefault();

        const $document = document.getElementById('document').value.trim();
        const $password = document.getElementById('password').value.trim();

        const user = {
            document_number: $document,
            password: $password
        };

        try {
            const validUser = await api.login(
                'http://localhost:3001/api/v1/employee/login', 
                user
            );
            
            if (validUser && validUser.token) {
                // Guardamos token y datos del empleado
                localStorage.setItem("token", validUser.token);
                localStorage.setItem("employee", JSON.stringify(validUser.employee));

                alert("Login exitoso");

                // Redirección según rol
                switch (validUser.employee.role_name) {
                    case "Administrador":
                        location.hash = '#/admin';
                        break;
                    
                    case "Empleado":
                        location.hash = '#/employee';
                        break;

                    default:
                        location.hash = '#/employee';
                        break;
                }
            } else {
                alert("No se recibió un token. Verifica el backend.");
            }

        } catch (error) {
            console.error("Error en login:", error);
            alert("Usuario o contraseña incorrectos");
        }
    });
}
