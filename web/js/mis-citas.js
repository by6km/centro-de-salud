/**
 * Mis Citas - Centro Médico
 */

"use strict"

document.addEventListener('DOMContentLoaded', function() {
    // Verificar sesión
    const usuario = obtenerUsuarioActual();
    
    if (!usuario) {
        window.location.href = '../login.html';
        return;
    }

    // Delegación de eventos para los botones de la tabla
    const tabla = document.getElementById('citasTableBody');
    if (tabla) {
        tabla.addEventListener('click', manejarClickEnTabla);
    }
});

function manejarClickEnTabla(event) {
    const boton = event.target.closest('button');
    if (!boton) return;

    const fila = boton.closest('tr');
    const accion = boton.dataset.action;

    // Datos básicos de la cita (según el orden de columnas)
    const fecha = fila.children[0].textContent.trim();
    const hora = fila.children[1].textContent.trim();
    const especialidad = fila.children[2].textContent.trim();
    const medico = fila.children[3].textContent.trim();

    if (accion === 'reprogramar') {
        alert(
            `Reprogramar cita:\n\n${fecha} ${hora}\n${especialidad} - ${medico}\n\n` +
            'En un proyecto real aquí abrirías un formulario para elegir nueva fecha/hora.'
        );
        // Aquí podrías hacer: window.location.href = 'pedir-cita.html';
    }

    if (accion === 'cancelar') {
        const confirmar = confirm(
            `¿Seguro que quieres cancelar esta cita?\n\n${fecha} ${hora}\n${especialidad} - ${medico}`
        );
        if (confirmar) {
            // En un backend real harías una petición DELETE/PUT
            alert('✅ Cita cancelada (simulado).');
            // Opcional: ocultar la fila
            // fila.remove();
        }
    }

    if (accion === 'ver-resultado') {
        alert(
            `Resultado de la cita:\n\n${fecha} ${hora}\n${especialidad} - ${medico}\n\n` +
            'Aquí iría el informe médico o PDF en el proyecto real (simulado).'
        );
    }
}

/**
 * Obtener usuario actual
 */
function obtenerUsuarioActual() {
    try {
        const usuario = localStorage.getItem('usuarioActual');
        return usuario ? JSON.parse(usuario) : null;
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        return null;
    }
}

/**
 * Cerrar sesión
 */
function cerrarSesion() {
    if (confirm('¿Estás seguro que quieres cerrar sesión?')) {
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('usuarioActual');
        console.log('✅ Sesión cerrada');
        window.location.href = '../login.html';
    }
}