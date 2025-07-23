document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const output = document.getElementById('output');
    const getProfileBtn = document.getElementById('get-profile');
    const logoutBtn = document.getElementById('logout');

    // LOGIN
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        try {
            const res = await fetch('/melodie/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Necesario para las cookies
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Error al iniciar sesión');

            // Guardar token en localStorage (opcional)
            localStorage.setItem('accessToken', data.accessToken);

            output.textContent = '✅ Sesión iniciada correctamente.\n\n' + JSON.stringify(data.user, null, 2);
        } catch (err) {
            output.textContent = '❌ ' + err.message;
        }
    });


    getProfileBtn.addEventListener('click', async() => {

        const token = localStorage.getItem('accessToken');

        if(!token) {
            output.textContent = '⚠️ No hay token. Por favor inicia sesión.';
            return;
        }

        try {
            const res = await fetch('/melodie/auth/my', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                credentials: 'include'
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.message|| 'Error al obtener el perfil');
            
            output.textContent = '👤 Perfil obtenido:\n\n' + JSON.stringify(data, null, 2);
        } catch (err) {
            output.textContent = '❌ ' + err.message;
        }
    })

    logoutBtn.addEventListener('click', async() => {
        try {
            const res = await fetch('/melodie/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });

            const data = await res.json();
            localStorage.removeItem('accessToken');

            if(!res.ok) throw new Error(data.message || 'Error al cerrar sesión');
            
            output.textContent = '👋 Sesión cerrada correctamente.';
        } catch (err) {
            output.textContent = '❌ ' + err.message;
        }
    })
});