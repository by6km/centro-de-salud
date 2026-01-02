/**
 * Login Handler - Centro Médico
 * Usa FormData como el proyecto de referencia
 */

"use strict"

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('loginForm');
    if (formulario) {
        formulario.addEventListener('submit', handleLogin);
    }
    
    // Verificar si ya está logueado
    const token = localStorage.getItem('sessionToken');
    const usuario = localStorage.getItem('usuarioActual');
    
    if (token && usuario) {
        try {
            const usuarioObj = JSON.parse(usuario);
            if (usuarioObj.tipo_usuario === 'paciente') {
                window.location.href = 'paciente/dashboard.html';
            } else if (usuarioObj.tipo_usuario === 'empleado') {
                window.location.href = 'empleado/dashboard.html';
            }
        } catch (error) {
            console.error('Error al parsear usuario:', error);
        }
    }
});

/**
 * Manejar el envío del formulario de login
 */
async function handleLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validar campos
    const nombre_usuario = formData.get('nombre_usuario');
    const contrasena = formData.get('contrasena');
    
    if (!nombre_usuario || !contrasena) {
        mostrarError('Por favor completa todos los campos');
        return;
    }
    
    // Mostrar cargando
    const boton = form.querySelector('button[type="submit"]');
    const textoOriginal = boton.textContent;
    boton.disabled = true;
    boton.textContent = 'Iniciando sesión...';
    
    try {
        // Enviar login
        const respuesta = await login(formData);
        
        if (respuesta && respuesta.sessionToken) {
            // Guardar información de sesión
            guardarInfoSesion(respuesta.user, respuesta.sessionToken);
            
            // Mostrar éxito
            mostrarExito('¡Bienvenido! Redirigiendo...');
            
            // Redirigir
            setTimeout(() => {
                if (respuesta.user.tipo_usuario === 'paciente') {
                    window.location.href = 'paciente/dashboard.html';
                } else if (respuesta.user.tipo_usuario === 'empleado') {
                    window.location.href = 'empleado/dashboard.html';
                } else {
                    window.location.href = 'index.html';
                }
            }, 1500);
        } else {
            mostrarError('Credenciales inválidas. Intenta de nuevo.');
            boton.disabled = false;
            boton.textContent = textoOriginal;
        }
    } catch (error) {
        console.error('Error en login:', error);
        mostrarError(error.message || 'Error al iniciar sesión. Intenta de nuevo.');
        boton.disabled = false;
        boton.textContent = textoOriginal;
    }
}

/**
 * Enviar login al servidor/mock
 */
async function login(formData) {
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error en login');
        }
        
        return await response.json();
    } catch (error) {
        console.error('❌ Error en solicitud:', error);
        throw error;
    }
}

/**
 * Guardar información de sesión
 */
function guardarInfoSesion(usuario, token) {
    localStorage.setItem('sessionToken', token);
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
}

/**
 * Mostrar error
 */
function mostrarError(mensaje) {
    const elemento = document.getElementById('alertaError');
    if (elemento) {
        elemento.textContent = mensaje;
        elemento.style.display = 'block';
        elemento.className = 'alert alert-error';
        
        setTimeout(() => {
            elemento.style.display = 'none';
        }, 5000);
    }
}

/**
 * Mostrar éxito
 */
function mostrarExito(mensaje) {
    const elemento = document.getElementById('alertaExito');
    if (elemento) {
        elemento.textContent = mensaje;
        elemento.style.display = 'block';
        elemento.className = 'alert alert-success';
    }
}

/**
 * Autocompletar con credenciales de demo
 */
function usarCredencialesPaciente() {
    document.getElementById('nombre_usuario').value = 'paciente1';
    document.getElementById('contrasena').value = '123456';
    document.getElementById('nombre_usuario').focus();
}

function usarCredencialesEmpleado() {
    document.getElementById('nombre_usuario').value = 'doctor1';
    document.getElementById('contrasena').value = '123456';
    document.getElementById('nombre_usuario').focus();
}

/**
 * Limpiar formulario
 */
function limpiarLogin() {
    document.getElementById('loginForm').reset();
    document.getElementById('alertaError').style.display = 'none';
    document.getElementById('alertaExito').style.display = 'none';
}