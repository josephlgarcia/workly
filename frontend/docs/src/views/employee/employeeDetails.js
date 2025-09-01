import { api } from "../../api/api.js";

export async function showEmployeeDetails() {
    document.getElementById('employee-subview').innerHTML = `
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                <div class="card shadow-sm border-0">
                    <div class="card-header bg-dark text-white py-3">
                    <i class="bi bi-person-vcard-fill me-2"></i>
                    <h5 class="mb-0"><i class="bi bi-person-fill me-2"></i>Información Personal</h5>
                    </div>
                    <div class="card-body bg-light">
                    <div class="row g-4">
                        <div class="col-md-6">
                        <p class="mb-1"><i class="bi bi-person-fill me-2 text-secondary"></i><strong>Nombre completo</strong></p>
                        <p id="fullName" class="mb-0" disabled></p>
                        </div>
                        <div class="col-md-6">
                        <p class="mb-1"><i class="bi bi-envelope-fill me-2 text-secondary"></i><strong>Correo electrónico</strong></p>
                        <p id="email" class="mb-0"></p>
                        </div>
                        <div class="col-md-6">
                        <p class="mb-1"><i class="bi bi-telephone-fill me-2 text-secondary"></i><strong>Teléfono</strong></p>
                        <p id="phone" class="mb-0"></p>
                        </div>
                        <div class="col-md-6">
                        <p class="mb-1"><i class="bi bi-geo-alt-fill me-2 text-secondary"></i><strong>Dirección</strong></p>
                        <p id="address" class="mb-0"></p>
                        </div>
                        <div class="col-md-6">
                        <p class="mb-1"><i class="bi bi-credit-card-fill me-2 text-secondary"></i><strong>DNI/NIE</strong></p>
                        <p id="document" class="mb-0"></p>
                        </div>
                        <div class="col-md-6">
                        <p class="mb-1"><i class="bi bi-person-fill"></i><strong>Género</strong></p>
                        <p id="gender" class="mb-0"></p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>`;
    
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        
        const employee = await api.getData(`http://localhost:3001/api/v1/employee/${user.id}`);

        document.getElementById("fullName").textContent = `${employee.first_name} ${employee.last_name}`;
        document.getElementById("email").textContent = employee.email;
        document.getElementById("phone").textContent = employee.phones[0];
        document.getElementById("address").textContent = employee.address;
        document.getElementById("document").textContent = employee.document_number;
        document.getElementById("gender").textContent = employee.gender;

    } catch (error) {
        console.error('Error in loadEmployeeDetailsView:', error);
    }
} 