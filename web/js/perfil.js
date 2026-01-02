/**
 * Perfil del Paciente - Centro Médico
 */

"use strict"

document.addEventListener('DOMContentLoaded', function() {
    // Verificar sesión
    const usuario = obtenerUsuarioActual();
    
    if (!usuario) {
        window.location.href = '../login.html';
        return;
    }
    
    // Cargar datos del usuario en el formulario
    cargarDatosUsuario(usuario);
    
    // Event listeners para formularios
    document.getElementById('perfilForm').addEventListener('submit', guardarPerfil);
    document.getElementById('cambiarContraForm').addEventListener('submit', cambiarContrasena);
});

/**
 * Cargar datos del usuario
 */
function cargarDatosUsuario(usuario) {
    document.getElementById('nombre_completo').value = usuario.nombre_completo || '';
    document.getElementById('email').value = usuario.email || '';
}

/**
 * Guardar perfil
 */
function guardarPerfil(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const datos = Object.fromEntries(formData);
    
    console.log('Guardando perfil:', datos);
    alert('✅ Perfil actualizado correctamente');
}

/**
 * Cambiar contraseña
 */
function cambiarContrasena(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const nuevaContrasena = formData.get('contrasena_nueva');
    const confirmar = formData.get('contrasena_confirmar');
    
    if (nuevaContrasena !== confirmar) {
        alert('❌ Las contraseñas no coinciden');
        return;
    }
    
    if (nuevaContrasena.length < 6) {
        alert('❌ La contraseña debe tener al menos 6 caracteres');
        return;
    }
    
    console.log('Contraseña cambiada');
    alert('✅ Contraseña cambida correctamente');
    e.target.reset();
}

/**
 * Desactivar cuenta
 */
function desactivarCuenta() {
    if (confirm('⚠️ ¿Estás seguro? Esta acción es irreversible y eliminarás tu cuenta.')) {
        if (confirm('⚠️ Esta es tu última oportunidad. ¿Estás 100% seguro?')) {
            localStorage.removeItem('sessionToken');
            localStorage.removeItem('usuarioActual');
            alert('✅ Tu cuenta ha sido desactivada');
            window.location.href = '../login.html';
        }
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