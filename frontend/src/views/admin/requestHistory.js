import { loadDynamicStyle } from "../../utils/styleManager.js";
import { initRequestHistoryEvents } from "../../controllers/requestHistoryController.js";

export async function showRequestHistory() {
    document.getElementById('app').innerHTML = `
    <h1>requestHistory</h1>`


    loadDynamicStyle('./src/styles/requestHistory.css', 'requestHistory');
    initRequestHistoryEvents();
}