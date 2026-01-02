/**
 * MOCK BACKEND - Simulación de API sin servidor
 * Compatible con FormData como en el proyecto de referencia
 */

// Base de datos simulada
const MOCK_DATABASE = {
    usuarios: [
        {
            id: 1,
            nombre_usuario: 'paciente1',
            contrasena: '123456',
            nombre_completo: 'Juan Pérez',
            email: 'paciente1@example.com',
            tipo_usuario: 'paciente'
        },
        {
            id: 2,
            nombre_usuario: 'doctor1',
            contrasena: '123456',
            nombre_completo: 'Dr. Carlos López',
            email: 'doctor1@example.com',
            tipo_usuario: 'empleado'
        }
    ],
    
    especialidades: [
        { id: 1, nombre: 'Cardiología', descripcion: 'Especialidad del corazón' },
        { id: 2, nombre: 'Neurología', descripcion: 'Especialidad del sistema nervioso' },
        { id: 3, nombre: 'Pediatría', descripcion: 'Especialidad infantil' },
        { id: 4, nombre: 'Dermatología', descripcion: 'Especialidad de la piel' },
        { id: 5, nombre: 'Oftalmología', descripcion: 'Especialidad de la vista' },
        { id: 6, nombre: 'Psicología', descripcion: 'Salud mental' }
    ]
};

// Interceptar fetch para simular API
const originalFetch = window.fetch;
window.fetch = function(url, options) {
    // Solo interceptar peticiones a localhost:3000
    if (url.includes('localhost:3000/api') || url.includes('localhost:3306/api')) {
        return mockAPIRequest(url, options);
    }
    
    // Otras peticiones pasan normal
    return originalFetch(url, options);
};

/**
 * Simular petición API
 */
async function mockAPIRequest(url, options) {
    const method = options?.method || 'GET';
    let body = null;
    
    // Manejar FormData
    if (options?.body instanceof FormData) {
        body = Object.fromEntries(options.body);
    } else if (options?.body) {
        try {
            body = JSON.parse(options.body);
        } catch {
            body = options.body;
        }
    }
    
    console.log('🎭 MOCK API:', method, url);
    if (body) console.log('📦 Datos:', body);
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // LOGIN
    if (url.includes('/api/auth/login') && method === 'POST') {
        return mockLogin(body);
    }
    
    // ESPECIALIDADES
    if (url.includes('/api/especialidades') && method === 'GET') {
        console.log('✅ Retornando especialidades:', MOCK_DATABASE.especialidades);
        return mockResponse(MOCK_DATABASE.especialidades);
    }
    
    // USUARIOS
    if (url.includes('/api/usuarios') && method === 'GET') {
        return mockResponse(MOCK_DATABASE.usuarios.map(u => {
            const { contrasena, ...user } = u;
            return user;
        }));
    }
    
    // Default: Not Found
    return mockResponse({ error: 'Endpoint no implementado en mock' }, 404);
}

/**
 * Mock de login - versión flexible con debug
 */
function mockLogin(body) {
    console.log('🔐 Intento de login con:', body);
    
    // Aceptar "contraseña" o "contrasena"
    const nombre_usuario = body.nombre_usuario;
    const contrasena = body.contrasena || body.contraseña || body.password;
    
    console.log('📝 Usuario recibido:', nombre_usuario);
    console.log('🔑 Contraseña recibida:', contrasena);
    
    if (!nombre_usuario || !contrasena) {
        console.error('❌ Faltan campos en el formulario');
        return mockResponse({ error: 'Faltan campos requeridos' }, 400);
    }
    
    // Buscar usuario
    const usuario = MOCK_DATABASE.usuarios.find(
        u => u.nombre_usuario === nombre_usuario && u.contrasena === contrasena
    );
    
    if (!usuario) {
        console.error('❌ Credenciales inválidas');
        console.log('👥 Usuarios disponibles:', MOCK_DATABASE.usuarios.map(u => u.nombre_usuario));
        return mockResponse({ error: 'Credenciales inválidas' }, 401);
    }
    
    // Login exitoso
    const { contrasena: _, ...userWithoutPassword } = usuario;
    
    console.log('✅ Login exitoso para:', nombre_usuario);
    
    return mockResponse({
        sessionToken: 'mock_token_' + Date.now(),
        user: userWithoutPassword
    });
}

/**
 * Crear respuesta mock
 */
function mockResponse(data, status = 200) {
    return Promise.resolve({
        ok: status >= 200 && status < 300,
        status: status,
        json: () => Promise.resolve(data),
        text: () => Promise.resolve(JSON.stringify(data)),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
}

console.log('🎭 Mock Backend activado - Usando FormData compatible');