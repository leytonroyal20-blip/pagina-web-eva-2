const loginForm = document.querySelector('#loginForm');

const validarNombre = (nombre) => {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{3,30}$/.test(nombre);
};

const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const sanitizarTexto = (texto) => {
    return texto.replace(/[<>]/g, '');
};

loginForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const nombre = sanitizarTexto(
        document.querySelector('#nombre').value.trim()
    );

    const email = sanitizarTexto(
        document.querySelector('#email').value.trim()
    );

    const tipoUsuario =
        document.querySelector('#tipoUsuario').value;

    let valido = true;

    document.querySelector('#errorNombre').textContent = '';
    document.querySelector('#errorEmail').textContent = '';
    document.querySelector('#errorTipo').textContent = '';

    if (!validarNombre(nombre)) {

        document.querySelector('#errorNombre').textContent =
            'Nombre inválido';

        valido = false;

    }

    if (!validarEmail(email)) {

        document.querySelector('#errorEmail').textContent =
            'Correo inválido';

        valido = false;

    }

    if (tipoUsuario === '') {

        document.querySelector('#errorTipo').textContent =
            'Selecciona un tipo de usuario';

        valido = false;

    }

    if (!valido) return;

    const usuario = {
        nombre,
        email,
        tipoUsuario
    };

    localStorage.setItem(
        'usuarioNexus',
        JSON.stringify(usuario)
    );

    window.location.href = 'dashboard.html';

});
