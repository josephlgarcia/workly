import { loadDynamicStyle } from "../../utils/styleManager.js";
import { initRequestApprovalEvents } from "../../controllers/requestApprovalController.js";

export async function showRequestApproval() {
    document.getElementById('app').innerHTML = `
    <h1>requestApproval</h1>`


    loadDynamicStyle('./src/styles/requestApproval.css', 'requestApproval');
    initRequestApprovalEvents();
}