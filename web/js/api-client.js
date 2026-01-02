/**
 * Cliente API - Conecta el frontend con los endpoints Silence
 * Maneja todas las llamadas HTTP al backend
 */

class APIClient {
    constructor(baseURL = 'http://localhost:3000/api') {
        this.baseURL = baseURL;
        this.token = localStorage.getItem('sessionToken') || null;
    }

    /**
     * Configurar token
     */
    setToken(token) {
        this.token = token;
        localStorage.setItem('sessionToken', token);
    }

    /**
     * Obtener token
     */
    getToken() {
        return this.token || localStorage.getItem('sessionToken');
    }

    /**
     * Realizar una solicitud HTTP genérica
     */
    async request(method, endpoint, data = null, headers = {}) {
        try {
            const url = `${this.baseURL}${endpoint}`;
            
            // Headers por defecto
            const defaultHeaders = {
                'Content-Type': 'application/json',
                ...headers
            };

            // Agregar token si existe
            const token = this.getToken();
            if (token) {
                defaultHeaders['Authorization'] = `Bearer ${token}`;
            }

            const options = {
                method,
                headers: defaultHeaders
            };

            if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
                options.body = JSON.stringify(data);
            }

            console.log(`📡 ${method} ${endpoint}`, data || '');

            const response = await fetch(url, options);
            const responseData = await response.json();

            if (!response.ok) {
                console.error(`❌ Error ${response.status}:`, responseData);
                throw new Error(responseData.message || `Error ${response.status}`);
            }

            console.log(`✅ ${method} ${endpoint}`, responseData);
            return responseData;
        } catch (error) {
            console.error('❌ Error en solicitud API:', error);
            throw error;
        }
    }

    // =====================================================
    // AUTENTICACIÓN
    // =====================================================

    /**
     * Login - Obtener token
     */
    async login(nombreUsuario, contrasena) {
        try {
            const response = await this.request('POST', '/auth/login', {
                nombre_usuario: nombreUsuario,
                contrasena: contrasena
            });

            if (response.sessionToken) {
                this.setToken(response.sessionToken);
            }

            return response;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    }

    /**
     * Logout
     */
    async logout() {
        try {
            await this.request('POST', '/auth/logout');
            this.token = null;
            localStorage.removeItem('sessionToken');
            return true;
        } catch (error) {
            console.error('Error en logout:', error);
            this.token = null;
            localStorage.removeItem('sessionToken');
            return true;
        }
    }

    /**
     * Verificar sesión activa
     */
    async verificarSesion() {
        try {
            const response = await this.request('GET', '/auth/verify');
            return response;
        } catch (error) {
            console.error('Sesión inválida:', error);
            return null;
        }
    }

    // =====================================================
    // USUARIOS
    // =====================================================

    /**
     * Obtener todos los usuarios
     */
    async obtenerUsuarios() {
        return this.request('GET', '/usuarios');
    }

    /**
     * Obtener usuario por ID
     */
    async obtenerUsuario(usuarioId) {
        return this.request('GET', `/usuarios/${usuarioId}`);
    }

    /**
     * Crear usuario
     */
    async crearUsuario(datos) {
        return this.request('POST', '/usuarios', datos);
    }

    /**
     * Actualizar usuario
     */
    async actualizarUsuario(usuarioId, datos) {
        return this.request('PUT', `/usuarios/${usuarioId}`, datos);
    }

    /**
     * Eliminar usuario
     */
    async eliminarUsuario(usuarioId) {
        return this.request('DELETE', `/usuarios/${usuarioId}`);
    }

    // =====================================================
    // PACIENTES
    // =====================================================

    /**
     * Obtener todos los pacientes
     */
    async obtenerPacientes() {
        return this.request('GET', '/pacientes');
    }

    /**
     * Obtener paciente por ID
     */
    async obtenerPaciente(pacienteId) {
        return this.request('GET', `/pacientes/${pacienteId}`);
    }

    /**
     * Obtener paciente por usuario ID
     */
    async obtenerPacienteByUsuario(usuarioId) {
        return this.request('GET', `/pacientes/usuario/${usuarioId}`);
    }

    /**
     * Crear paciente
     */
    async crearPaciente(datos) {
        return this.request('POST', '/pacientes', datos);
    }

    /**
     * Actualizar paciente
     */
    async actualizarPaciente(pacienteId, datos) {
        return this.request('PUT', `/pacientes/${pacienteId}`, datos);
    }

    /**
     * Eliminar paciente
     */
    async eliminarPaciente(pacienteId) {
        return this.request('DELETE', `/pacientes/${pacienteId}`);
    }

    // =====================================================
    // EMPLEADOS
    // =====================================================

    /**
     * Obtener todos los empleados
     */
    async obtenerEmpleados() {
        return this.request('GET', '/empleados');
    }

    /**
     * Obtener empleado por ID
     */
    async obtenerEmpleado(empleadoId) {
        return this.request('GET', `/empleados/${empleadoId}`);
    }

    /**
     * Obtener empleado por usuario ID
     */
    async obtenerEmpleadoByUsuario(usuarioId) {
        return this.request('GET', `/empleados/usuario/${usuarioId}`);
    }

    /**
     * Crear empleado
     */
    async crearEmpleado(datos) {
        return this.request('POST', '/empleados', datos);
    }

    /**
     * Actualizar empleado
     */
    async actualizarEmpleado(empleadoId, datos) {
        return this.request('PUT', `/empleados/${empleadoId}`, datos);
    }

    /**
     * Eliminar empleado
     */
    async eliminarEmpleado(empleadoId) {
        return this.request('DELETE', `/empleados/${empleadoId}`);
    }

    // =====================================================
    // ESPECIALIDADES
    // =====================================================

    /**
     * Obtener todas las especialidades
     */
    async obtenerEspecialidades() {
        return this.request('GET', '/especialidades');
    }

    /**
     * Obtener especialidad por ID
     */
    async obtenerEspecialidad(especialidadId) {
        return this.request('GET', `/especialidades/${especialidadId}`);
    }

    /**
     * Crear especialidad
     */
    async crearEspecialidad(datos) {
        return this.request('POST', '/especialidades', datos);
    }

    /**
     * Actualizar especialidad
     */
    async actualizarEspecialidad(especialidadId, datos) {
        return this.request('PUT', `/especialidades/${especialidadId}`, datos);
    }

    /**
     * Eliminar especialidad
     */
    async eliminarEspecialidad(especialidadId) {
        return this.request('DELETE', `/especialidades/${especialidadId}`);
    }

    // =====================================================
    // CITAS MÉDICAS
    // =====================================================

    /**
     * Obtener todas las citas
     */
    async obtenerCitas() {
        return this.request('GET', '/citas_medicas');
    }

    /**
     * Obtener cita por ID
     */
    async obtenerCita(citaId) {
        return this.request('GET', `/citas_medicas/${citaId}`);
    }

    /**
     * Obtener citas de un paciente
     */
    async obtenerCitasPaciente(pacienteId) {
        return this.request('GET', `/citas_medicas/paciente/${pacienteId}`);
    }

    /**
     * Obtener citas de un empleado
     */
    async obtenerCitasEmpleado(empleadoId) {
        return this.request('GET', `/citas_medicas/empleado/${empleadoId}`);
    }

    /**
     * Crear cita
     */
    async crearCita(datos) {
        return this.request('POST', '/citas_medicas', datos);
    }

    /**
     * Actualizar cita
     */
    async actualizarCita(citaId, datos) {
        return this.request('PUT', `/citas_medicas/${citaId}`, datos);
    }

    /**
     * Eliminar cita
     */
    async eliminarCita(citaId) {
        return this.request('DELETE', `/citas_medicas/${citaId}`);
    }

    /**
     * Cambiar estado de cita
     */
    async cambiarEstadoCita(citaId, estado) {
        return this.request('PATCH', `/citas_medicas/${citaId}/estado`, {
            estado: estado
        });
    }

    // =====================================================
    // EXPEDIENTES MÉDICOS
    // =====================================================

    /**
     * Obtener expedientes
     */
    async obtenerExpedientes() {
        return this.request('GET', '/expedientes_medicos');
    }

    /**
     * Obtener expediente por ID
     */
    async obtenerExpediente(expedienteId) {
        return this.request('GET', `/expedientes_medicos/${expedienteId}`);
    }

    /**
     * Obtener expediente de paciente
     */
    async obtenerExpedientePaciente(pacienteId) {
        return this.request('GET', `/expedientes_medicos/paciente/${pacienteId}`);
    }

    /**
     * Crear expediente
     */
    async crearExpediente(datos) {
        return this.request('POST', '/expedientes_medicos', datos);
    }

    /**
     * Actualizar expediente
     */
    async actualizarExpediente(expedienteId, datos) {
        return this.request('PUT', `/expedientes_medicos/${expedienteId}`, datos);
    }

    /**
     * Eliminar expediente
     */
    async eliminarExpediente(expedienteId) {
        return this.request('DELETE', `/expedientes_medicos/${expedienteId}`);
    }

    // =====================================================
    // INVENTARIO
    // =====================================================

    /**
     * Obtener inventario completo
     */
    async obtenerInventario() {
        return this.request('GET', '/inventario');
    }

    /**
     * Obtener medicamento por ID
     */
    async obtenerMedicamento(medicamentoId) {
        return this.request('GET', `/inventario/${medicamentoId}`);
    }

    /**
     * Obtener medicamentos con bajo stock
     */
    async obtenerBajoStock() {
        return this.request('GET', '/inventario/bajo-stock');
    }

    /**
     * Obtener medicamentos vencidos
     */
    async obtenerVencidos() {
        return this.request('GET', '/inventario/vencidos');
    }

    /**
     * Agregar medicamento
     */
    async agregarMedicamento(datos) {
        return this.request('POST', '/inventario', datos);
    }

    /**
     * Actualizar medicamento
     */
    async actualizarMedicamento(medicamentoId, datos) {
        return this.request('PUT', `/inventario/${medicamentoId}`, datos);
    }

    /**
     * Eliminar medicamento
     */
    async eliminarMedicamento(medicamentoId) {
        return this.request('DELETE', `/inventario/${medicamentoId}`);
    }

    /**
     * Actualizar cantidad de medicamento
     */
    async actualizarCantidad(medicamentoId, cantidad) {
        return this.request('PATCH', `/inventario/${medicamentoId}/cantidad`, {
            cantidad: cantidad
        });
    }

    // =====================================================
    // MOVIMIENTOS DE INVENTARIO
    // =====================================================

    /**
     * Obtener movimientos de inventario
     */
    async obtenerMovimientos() {
        return this.request('GET', '/movimientos_inventario');
    }

    /**
     * Registrar movimiento
     */
    async registrarMovimiento(datos) {
        return this.request('POST', '/movimientos_inventario', datos);
    }

    /**
     * Obtener movimientos de medicamento
     */
    async obtenerMovimientosMedicamento(medicamentoId) {
        return this.request('GET', `/movimientos_inventario/medicamento/${medicamentoId}`);
    }

    // =====================================================
    // TURNOS DE EMPLEADOS
    // =====================================================

    /**
     * Obtener turnos
     */
    async obtenerTurnos() {
        return this.request('GET', '/turnos_empleados');
    }

    /**
     * Obtener turno por ID
     */
    async obtenerTurno(turnoId) {
        return this.request('GET', `/turnos_empleados/${turnoId}`);
    }

    /**
     * Obtener turnos de empleado
     */
    async obtenerTurnosEmpleado(empleadoId) {
        return this.request('GET', `/turnos_empleados/empleado/${empleadoId}`);
    }

    /**
     * Crear turno
     */
    async crearTurno(datos) {
        return this.request('POST', '/turnos_empleados', datos);
    }

    /**
     * Actualizar turno
     */
    async actualizarTurno(turnoId, datos) {
        return this.request('PUT', `/turnos_empleados/${turnoId}`, datos);
    }

    /**
     * Eliminar turno
     */
    async eliminarTurno(turnoId) {
        return this.request('DELETE', `/turnos_empleados/${turnoId}`);
    }

    // =====================================================
    // SERVICIOS DE CONSULTAS
    // =====================================================

    /**
     * Obtener servicios
     */
    async obtenerServicios() {
        return this.request('GET', '/servicios_consultas');
    }

    /**
     * Obtener servicio por ID
     */
    async obtenerServicio(servicioId) {
        return this.request('GET', `/servicios_consultas/${servicioId}`);
    }

    /**
     * Crear servicio
     */
    async crearServicio(datos) {
        return this.request('POST', '/servicios_consultas', datos);
    }

    /**
     * Actualizar servicio
     */
    async actualizarServicio(servicioId, datos) {
        return this.request('PUT', `/servicios_consultas/${servicioId}`, datos);
    }

    /**
     * Eliminar servicio
     */
    async eliminarServicio(servicioId) {
        return this.request('DELETE', `/servicios_consultas/${servicioId}`);
    }
}

// =====================================================
// INSTANCIA GLOBAL DE API
// =====================================================

// Crear instancia global del cliente API
const api = new APIClient();

// Exportar para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APIClient;
}