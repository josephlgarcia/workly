// app/api/api.js

// Helper genérico para requests
async function request(url, { method = "GET", data = null, auth = true } = {}) {
    const headers = { "Content-Type": "application/json" };

    // Solo añade Authorization si se requiere y existe token
    if (auth) {
        const token = localStorage.getItem("token");
        if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    const opts = { method, headers };
    if (data !== null) opts.body = JSON.stringify(data);

    const res = await fetch(url, opts);

    if (!res.ok) {
        // Intenta leer el cuerpo para depurar mejor
        let detail = "";
        try { detail = await res.text(); } catch { }
        throw new Error(`HTTP ${res.status} ${res.statusText}${detail ? ` - ${detail}` : ""}`);
    }

    // Si no hay contenido o no es JSON, devuelve null
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("application/json")) return null;

    return res.json();
}

export const api = {
    // 🔐 Login NO usa token
    async login(url, data) {
        return request(url, { method: "POST", data, auth: false });
    },

    // 🔹 Rutas protegidas (añaden Bearer si existe token)
    async getData(url) {
        return request(url, { method: "GET" });
    },

    async postData(url, data) {
        return request(url, { method: "POST", data });
    },

    async putData(url, data) {
        return request(url, { method: "PUT", data });
    },

    async patchData(url, data) {
        return request(url, { method: "PATCH", data });
    },

    // admite opcionalmente body por si tu API lo usa
    async deleteData(url, data = null) {
        return request(url, { method: "DELETE", data });
    }
};
