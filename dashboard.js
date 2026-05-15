const usuario =
    JSON.parse(localStorage.getItem('usuarioNexus'));

if (!usuario) {

    window.location.href = 'index.html';

}

const usuarioPanel =
    document.querySelector('#usuarioPanel');

const horaActual =
    document.querySelector('#horaActual');

const chatBox =
    document.querySelector('#chatBox');

const chatForm =
    document.querySelector('#chatForm');

const mensajeInput =
    document.querySelector('#mensajeInput');

const cerrarSesion =
    document.querySelector('#cerrarSesion');

usuarioPanel.textContent =
    `Usuario: ${usuario.nombre}`;

const actualizarHora = () => {

    const ahora = new Date();

    horaActual.textContent =
        `Hora: ${ahora.toLocaleTimeString()}`;

};

setInterval(actualizarHora, 1000);

actualizarHora();

let mensajes =
    JSON.parse(localStorage.getItem('mensajesNexus'))
    || [];

const guardarMensajes = () => {

    localStorage.setItem(
        'mensajesNexus',
        JSON.stringify(mensajes)
    );

};

const crearMensaje = (texto, tipo) => {

    const mensaje = document.createElement('div');

    mensaje.className =
        tipo === 'usuario'
        ? 'mensaje usuario'
        : 'mensaje nexus';

    chatBox.appendChild(mensaje);

    let index = 0;

    const escribir = setInterval(() => {

        mensaje.textContent += texto[index];

        index++;

        if (index >= texto.length) {

            clearInterval(escribir);

        }

    }, 20);

    chatBox.scrollTop = chatBox.scrollHeight;

};

const renderizarMensajes = () => {

    chatBox.innerHTML = '';

    mensajes.forEach(m => {

        crearMensaje(m.texto, m.tipo);

    });

};

const cambiarTema = (tema) => {

    document.body.className = tema;

};

const responderIA = (mensaje) => {

    const texto = mensaje.toLowerCase();

    if (texto.includes('hola')) {
        return 'Hola. NEXUS AI se encuentra operativo.';
    }

    if (texto.includes('ayuda')) {
        return `
Comandos disponibles:
hola
javascript
react
html
css
hora
fecha
estado
tema azul
tema rojo
tema verde
tema morado
        `;
    }

    if (texto.includes('javascript')) {
        return 'JavaScript es el núcleo principal de esta interfaz.';
    }

    if (texto.includes('react')) {
        return 'React permite crear interfaces dinámicas modernas.';
    }

    if (texto.includes('html')) {
        return 'HTML estructura toda la interfaz visual.';
    }

    if (texto.includes('css')) {
        return 'CSS controla diseño, colores y animaciones.';
    }

    if (texto.includes('hora')) {
        return `La hora actual es ${new Date().toLocaleTimeString()}`;
    }

    if (texto.includes('fecha')) {
        return `Hoy es ${new Date().toLocaleDateString()}`;
    }

    if (texto.includes('estado')) {
        return 'Todos los sistemas se encuentran estables.';
    }

    if (texto.includes('tema rojo')) {

        cambiarTema('theme-red');

        return 'Tema rojo activado.';
    }

    if (texto.includes('tema verde')) {

        cambiarTema('theme-green');

        return 'Tema verde activado.';
    }

    if (texto.includes('tema morado')) {

        cambiarTema('theme-purple');

        return 'Tema morado activado.';
    }

    if (texto.includes('tema azul')) {

        cambiarTema('theme-blue');

        return 'Tema azul activado.';
    }

    return 'Soy un prototipo experimental y todavía sigo aprendiendo nuevas respuestas.';
};

chatForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const texto =
        mensajeInput.value.trim();

    if (texto === '') return;

    const mensajeUsuario = {
        texto,
        tipo: 'usuario'
    };

    mensajes = [...mensajes, mensajeUsuario];

    crearMensaje(texto, 'usuario');

    mensajeInput.value = '';

    setTimeout(() => {

        const respuestaTexto =
            responderIA(texto);

        const respuestaIA = {
            texto: respuestaTexto,
            tipo: 'nexus'
        };

        mensajes = [...mensajes, respuestaIA];

        crearMensaje(
            respuestaTexto,
            'nexus'
        );

        guardarMensajes();

    }, 1000);

});

cerrarSesion.addEventListener('click', () => {

    localStorage.removeItem('usuarioNexus');

    window.location.href = 'index.html';

});

renderizarMensajes();
