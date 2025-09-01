import { api } from "../../api/api";

export async function showEmployeeContract() {
    document.getElementById('employee-subview').innerHTML = `
    <div class="container mt-5">
    <h1 class="mb-4">Datos del Contrato</h1>
    <div class="card shadow-sm">
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-sm-4 fw-bold">ID Contrato:</div>
                <div class="col-sm-8">
                    <p id="idContract"></p>
                </div>
                </div>
                <div class="row mb-3">
                <div class="col-sm-4 fw-bold">Cargo:</div>
                <div class="col-sm-8">
                    <p id="position">
                    </p>
                </div>
                </div>
                <div class="row mb-3">
                <div class="col-sm-4 fw-bold">Fecha de inicio:</div>
                <div class="col-sm-8">
                    <p id="startDate">
                    </p>
                </div>
                </div>
                <div class="row mb-3">
                <div class="col-sm-4 fw-bold">Tipo de contrato:</div>
                <div class="col-sm-8">
                    <p id="contractType">
                    </p>
                </div>
                <div class="row mb-3">
                <div class="col-sm-4 fw-bold">Jornada:</div>
                <div class="col-sm-8">Tiempo completo</div>
                </div>
                <div class="row">
                <div class="col-sm-4 fw-bold">Salario mensual:</div>
                <div class="col-sm-8">
                    <p id="salary"></p>
                </div>
            </div>
        </div>
        </div>
    </div>`;

    try {
        const user = JSON.parse(localStorage.getItem("user"));
        
        const employee = await api.getData(`http://localhost:3001/api/v1/employee/${user.id}`);
        const position = await api.getData(`http://localhost:3001/api/v1/position/${employee.position_id}`);

        document.getElementById('salary').textContent = employee.salary;
        document.getElementById('idContract').textContent = employee.id_contract;
        document.getElementById('startDate').textContent = employee.start_date.split("T")[0];
        document.getElementById('contractType').textContent = employee.contract_type;
        document.getElementById('position').textContent = position.name;

        } catch (error) {
            console.error('Error in loadEmployeeDetailsView:', error);
        }
}