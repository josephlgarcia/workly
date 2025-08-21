import { loadDynamicStyle } from "../../utils/styleManager.js";
import { initEmployeeListEvents } from "../../controllers/employeeListController.js";

export async function showEmployeeList() {
    document.getElementById('app').innerHTML = `
    <h1>employeeList</h1>`


    loadDynamicStyle('./src/styles/employeeList.css', 'employeeList');
    initEmployeeListEvents();
}