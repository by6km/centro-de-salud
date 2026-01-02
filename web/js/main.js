/**
 * Script principal de la aplicación
 * Contiene funciones generales y utilidades
 */

// =====================================================
// INICIALIZACIÓN
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarApp();
});

function inicializarApp() {
    console.log('Aplicación inicializada');
    
    // Cargar elementos dinámicos si es necesario
    cargarElementosDinamicos();
    
    // Configurar event listeners globales
    configurarEventListeners();
}

// =====================================================
// EVENT LISTENERS GLOBALES
// =====================================================

function configurarEventListeners() {
    // Click en enlaces smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const elemento = document.querySelector(href);
                if (elemento) {
                    elemento.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Cerrar menús al hacer click fuera
    document.addEventListener('click', function(event) {
        const navMenu = document.querySelector('.nav-menu');
        const logo = document.querySelector('.logo');
        
        if (navMenu && logo && !navMenu.contains(event.target) && !logo.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// =====================================================
// CARGAR ELEMENTOS DINÁMICOS
// =====================================================

function cargarElementosDinamicos() {
    // Cargar especialidades si estamos en la página de especialidades
    if (document.getElementById('especialidades-detalle')) {
        cargarEspecialidadesEnHome();
    }
}

async function cargarEspecialidadesEnHome() {
    try {
        const especialidades = await api.obtenerEspecialidades();
        console.log('Especialidades cargadas:', especialidades);
    } catch (error) {
        console.error('Error cargando especialidades:', error);
    }
}

// =====================================================
// UTILIDADES GENERALES
// =====================================================

/**
 * Formato de fecha
 */
function formatearFecha(fecha) {
    if (!fecha) return '';
    
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

/**
 * Formato de hora
 */
function formatearHora(hora) {
    if (!hora) return '';
    
    const [h, m] = hora.split(':');
    return `${h}:${m}`;
}

/**
 * Capitalizar texto
 */
function capitalizar(texto) {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

/**
 * Validar email
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Validar teléfono
 */
function validarTelefono(telefono) {
    const regex = /^\+?[\d\s\-()]+$/;
    return regex.test(telefono) && telefono.length >= 9;
}

/**
 * Generar ID único
 */
function generarIdUnico() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Esperar (promise-based delay)
 */
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// =====================================================
// FUNCIONES DE UI
// =====================================================

/**
 * Mostrar elemento con animación
 */
function mostrarElemento(elemento, velocidad = 300) {
    if (typeof elemento === 'string') {
        elemento = document.getElementById(elemento);
    }
    
    if (!elemento) return;
    
    elemento.style.display = 'block';
    elemento.style.opacity = '0';
    elemento.style.transition = `opacity ${velocidad}ms ease`;
    
    setTimeout(() => {
        elemento.style.opacity = '1';
    }, 10);
}

/**
 * Ocultar elemento con animación
 */
function ocultarElemento(elemento, velocidad = 300) {
    if (typeof elemento === 'string') {
        elemento = document.getElementById(elemento);
    }
    
    if (!elemento) return;
    
    elemento.style.opacity = '0';
    elemento.style.transition = `opacity ${velocidad}ms ease`;
    
    setTimeout(() => {
        elemento.style.display = 'none';
    }, velocidad);
}

/**
 * Limpiar formulario
 */
function limpiarFormulario(formularioId) {
    const formulario = document.getElementById(formularioId);
    if (formulario) {
        formulario.reset();
        formulario.querySelectorAll('.error').forEach(el => {
            el.classList.remove('error');
        });
    }
}

/**
 * Validar formulario requerido
 */
function validarFormularioRequerido(formularioId) {
    const formulario = document.getElementById(formularioId);
    if (!formulario) return false;
    
    let esValido = true;
    const campos = formulario.querySelectorAll('[required]');
    
    campos.forEach(campo => {
        if (!campo.value.trim()) {
            campo.classList.add('error');
            esValido = false;
        } else {
            campo.classList.remove('error');
        }
    });
    
    return esValido;
}

// =====================================================
// FUNCIONES DE TABLA
// =====================================================

/**
 * Crear fila de tabla
 */
function crearFilaTabla(datos, cabeceras) {
    let html = '<tr>';
    cabeceras.forEach(cabecera => {
        const valor = datos[cabecera] || '-';
        html += `<td>${valor}</td>`;
    });
    html += '</tr>';
    return html;
}

/**
 * Llenar tabla
 */
function llenarTabla(tableId, datos, cabeceras) {
    const tabla = document.getElementById(tableId);
    if (!tabla) return;
    
    const tbody = tabla.querySelector('tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (datos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="' + cabeceras.length + '" class="text-center">No hay datos</td></tr>';
        return;
    }
    
    datos.forEach(fila => {
        tbody.innerHTML += crearFilaTabla(fila, cabeceras);
    });
}

// =====================================================
// FUNCIONES DE NOTIFICACIÓN
// =====================================================

/**
 * Toast/Notificación
 */
function notificar(mensaje, tipo = 'info', duracion = 3000) {
    // Crear elemento de notificación
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.textContent = mensaje;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${obtenerColorTipo(tipo)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Auto-remover
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, duracion);
}

function obtenerColorTipo(tipo) {
    const colores = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colores[tipo] || colores.info;
}

// =====================================================
// FUNCIONES DE ALMACENAMIENTO LOCAL
// =====================================================

/**
 * Guardar en localStorage
 */
function guardarLocal(clave, valor) {
    try {
        localStorage.setItem(clave, JSON.stringify(valor));
        return true;
    } catch (error) {
        console.error('Error guardando en localStorage:', error);
        return false;
    }
}

/**
 * Obtener de localStorage
 */
function obtenerLocal(clave) {
    try {
        const valor = localStorage.getItem(clave);
        return valor ? JSON.parse(valor) : null;
    } catch (error) {
        console.error('Error obteniendo de localStorage:', error);
        return null;
    }
}

/**
 * Eliminar de localStorage
 */
function eliminarLocal(clave) {
    try {
        localStorage.removeItem(clave);
        return true;
    } catch (error) {
        console.error('Error eliminando de localStorage:', error);
        return false;
    }
}

// =====================================================
// FUNCIONES DE NAVEGACIÓN
// =====================================================

/**
 * Ir a página
 */
function irA(url) {
    window.location.href = url;
}

/**
 * Atrás
 */
function irAtras() {
    window.history.back();
}

/**
 * Abrir en nueva pestaña
 */
function abrirEnNuevaTab(url) {
    window.open(url, '_blank');
}

// =====================================================
// FUNCIONES DE DEPURACIÓN
// =====================================================

/**
 * Log con timestamp
 */
function log(mensaje, datos = null) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${mensaje}`, datos || '');
}

/**
 * Error log
 */
function logError(mensaje, error = null) {
    const timestamp = new Date().toLocaleTimeString();
    console.error(`[${timestamp}] ❌ ${mensaje}`, error || '');
}

/**
 * Warning log
 */
function logWarn(mensaje, datos = null) {
    const timestamp = new Date().toLocaleTimeString();
    console.warn(`[${timestamp}] ⚠️ ${mensaje}`, datos || '');
}

/**
 * Success log
 */
function logSuccess(mensaje, datos = null) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ✅ ${mensaje}`, datos || '');
}