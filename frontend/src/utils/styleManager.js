
// Remove all dynamic styles
export function clearDynamicStyles() {
    document.querySelectorAll('link[data-style]').forEach(link => link.remove());
}

// Inject new dynamic CSS
export function loadDynamicStyle(href, name) {
    clearDynamicStyles(); // First we clean
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.style = name;
    document.head.appendChild(link);
}
