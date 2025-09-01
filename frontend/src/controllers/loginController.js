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

            console.log(validUser);
            
            
            if (validUser && validUser.token) {
                localStorage.setItem("token", validUser.token);
                localStorage.setItem("user", JSON.stringify(validUser.employee));

                switch (validUser.employee.role_name) {
                    case "admin":
                        location.hash = '#/admin';
                        break;
                    
                    case "employee":
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
