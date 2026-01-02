/**
 * Pedir Cita - Centro Médico
 */

"use strict"

// Base de datos de médicos por especialidad
const MEDICOS_DB = {
    1: [ // Cardiología
        { id: 1, nombre: 'Dr. Carlos López', telefono: '555-0101' },
        { id: 2, nombre: 'Dra. Patricia García', telefono: '555-0102' }
    ],
    2: [ // Neurología
        { id: 3, nombre: 'Dra. María Rodríguez', telefono: '555-0201' },
        { id: 4, nombre: 'Dr. Juan Martínez', telefono: '555-0202' }
    ],
    3: [ // Pediatría
        { id: 5, nombre: 'Dr. Juan García', telefono: '555-0301' },
        { id: 6, nombre: 'Dra. Ana López', telefono: '555-0302' }
    ],
    4: [ // Dermatología
        { id: 7, nombre: 'Dr. Roberto Díaz', telefono: '555-0401' },
        { id: 8, nombre: 'Dra. Carmen Pérez', telefono: '555-0402' }
    ],
    5: [ // Oftalmología
        { id: 9, nombre: 'Dr. Javier Ruiz', telefono: '555-0501' },
        { id: 10, nombre: 'Dra. Isabel Fernández', telefono: '555-0502' }
    ],
    6: [ // Psicología
        { id: 11, nombre: 'Dra. Elena Sánchez', telefono: '555-0601' },
        { id: 12, nombre: 'Dr. Luis Moreno', telefono: '555-0602' }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    // Verificar sesión
    const usuario = obtenerUsuarioActual();
    
    if (!usuario) {
        window.location.href = '../login.html';
        return;
    }
    
    // Cargar especialidades
    cargarEspecialidades();
    
    // Configurar fecha mínima
    const hoy = new Date();
    document.getElementById('fecha').min = hoy.toISOString().split('T')[0];
    
    // Event listener para envío de formulario
    document.getElementById('citaForm').addEventListener('submit', guardarCita);
});

/**
 * Cargar especialidades
 */
async function cargarEspecialidades() {
    try {
        const response = await fetch('http://localhost:3000/api/especialidades');
        const data = await response.json();
        
        console.log('✅ Especialidades cargadas:', data);
        
        const selectEspecialidad = document.getElementById('especialidad');
        
        // Limpiar opciones previas
        selectEspecialidad.innerHTML = '<option value="">-- Selecciona una especialidad --</option>';
        
        // Agregar opciones
        data.forEach(especialidad => {
            const option = document.createElement('option');
            option.value = especialidad.id;
            option.textContent = especialidad.nombre;
            selectEspecialidad.appendChild(option);
        });
        
        // Ocultar error
        document.getElementById('especialidadError').style.display = 'none';
        
    } catch (error) {
        console.error('❌ Error cargando especialidades:', error);
        document.getElementById('especialidadError').textContent = 'Error cargando especialidades';
        document.getElementById('especialidadError').style.display = 'block';
    }
}

/**
 * Cargar médicos según especialidad seleccionada
 */
function cargarMedicos() {
    const especialidadId = document.getElementById('especialidad').value;
    const selectMedico = document.getElementById('medico');
    
    // Limpiar opciones
    selectMedico.innerHTML = '<option value="">-- Selecciona un médico --</option>';
    
    if (!especialidadId) {
        document.getElementById('medicoError').textContent = 'Selecciona una especialidad primero';
        document.getElementById('medicoError').style.display = 'block';
        return;
    }
    
    // Obtener médicos
    const medicos = MEDICOS_DB[especialidadId] || [];
    
    console.log('🏥 Médicos para especialidad ' + especialidadId + ':', medicos);
    
    if (medicos.length === 0) {
        document.getElementById('medicoError').textContent = 'No hay médicos disponibles para esta especialidad';
        document.getElementById('medicoError').style.display = 'block';
        return;
    }
    
    // Agregar opciones de médicos
    medicos.forEach(medico => {
        const option = document.createElement('option');
        option.value = medico.id;
        option.textContent = medico.nombre;
        selectMedico.appendChild(option);
    });
    
    // Ocultar error
    document.getElementById('medicoError').style.display = 'none';
    
    console.log('✅ Médicos cargados correctamente');
}

/**
 * Guardar cita
 */
function guardarCita(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const datos = {
        especialidad: document.getElementById('especialidad').options[document.getElementById('especialidad').selectedIndex].text,
        medico: document.getElementById('medico').options[document.getElementById('medico').selectedIndex].text,
        fecha: formData.get('fecha'),
        hora: formData.get('hora'),
        motivo: formData.get('motivo')
    };
    
    console.log('📋 Cita agendada:', datos);
    
    // Simular envío
    alert(`✅ Cita agendada con éxito!\n\nEspecialidad: ${datos.especialidad}\nMédico: ${datos.medico}\nFecha: ${datos.fecha}\nHora: ${datos.hora}`);
    
    // Limpiar formulario
    e.target.reset();
    
    // Redirigir a mis citas
    setTimeout(() => {
        window.location.href = 'mis-citas.html';
    }, 1500);
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