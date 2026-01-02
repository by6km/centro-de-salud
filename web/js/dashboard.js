/**
 * Dashboard del Paciente - Centro Médico
 */

"use strict"

document.addEventListener('DOMContentLoaded', function() {
    // Verificar sesión
    const usuario = obtenerUsuarioActual();
    
    if (!usuario) {
        window.location.href = '../login.html';
        return;
    }
    
    // Mostrar nombre del usuario
    document.getElementById('nombreUsuario').textContent = usuario.nombre_completo || usuario.nombre_usuario;
    
    // Cargar datos del dashboard
    cargarDatos();
});

/**
 * Cargar datos del dashboard
 */
function cargarDatos() {
    // Datos de prueba
    document.getElementById('totalCitas').textContent = '3 citas';
    document.getElementById('proximaCita').textContent = 'Cardiología - Dr. López';
    document.getElementById('proximaCitaFecha').textContent = 'Mañana a las 10:00 AM';
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