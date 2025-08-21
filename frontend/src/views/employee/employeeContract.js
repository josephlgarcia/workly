import { loadDynamicStyle } from "../../utils/styleManager.js";
import { initEmployeeContractEvents } from "../../controllers/employeeContractController.js";

export async function showEmployeeContract() {
    document.getElementById('app').innerHTML = `
    <h1>employeeContract</h1>`


    loadDynamicStyle('./src/styles/employeeContract.css', 'employeeContract');
    initEmployeeContractEvents();
}