# 🏥 Centro Médico - Plataforma Web

Sistema integral de gestión médica construido con HTML5, CSS3, JavaScript vanilla y una API REST Silence.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Credenciales de Prueba](#credenciales-de-prueba)
- [Endpoints API](#endpoints-api)
- [Archivos Creados](#archivos-creados)

---

## ✨ Características

### 🌐 Público
- ✅ Página de inicio con información del centro
- ✅ Catálogo de especialidades médicas
- ✅ Página "Nosotros" con equipo y valores
- ✅ Sistema de autenticación seguro

### 👤 Para Pacientes
- ✅ Dashboard personal
- ✅ Agendar nuevas citas
- ✅ Ver historial de citas
- ✅ Expediente médico completo
- ✅ Perfil y datos personales
- ✅ Ver diagnósticos y medicamentos

### 👨‍⚕️ Para Empleados
- ✅ Dashboard administrativo
- ✅ Gestión de pacientes
- ✅ Gestión de turnos y citas
- ✅ Control de inventario/almacén
- ✅ Medicamentos con bajo stock
- ✅ Movimientos de inventario

---

## 📁 Estructura del Proyecto

```
web/
├── index.html                      # Página de inicio
├── especialidades.html             # Catálogo de especialidades
├── login.html                      # Autenticación
├── nosotros.html                   # Información del centro
│
├── css/
│   ├── estilos.css                # Estilos generales
│   ├── dashboard.css              # Estilos de dashboards
│   ├── login.css                  # Estilos del login
│   └── responsive.css             # Diseño responsivo
│
├── js/
│   ├── api-client.js              # Cliente HTTP para API
│   ├── auth.js                    # Gestión de sesiones
│   ├── main.js                    # Funciones generales
│   ├── login.js                   # Lógica de login
│   │
│   ├── paciente/
│   │   ├── dashboard.js           # Panel paciente
│   │   ├── pedir-cita.js          # Agendar cita
│   │   ├── expediente.js          # Expediente médico
│   │   └── mis-citas.js           # Historial de citas
│   │
│   └── empleado/
│       ├── dashboard.js           # Panel empleado
│       ├── almacen.js             # Gestión de inventario
│       ├── pacientes.js           # Gestión de pacientes
│       └── turnos.js              # Gestión de turnos
│
├── paciente/
│   ├── dashboard.html
│   ├── pedir-cita.html
│   ├── expediente.html
│   ├── mis-citas.html
│   └── perfil.html
│
└── empleado/
    ├── dashboard.html
    ├── pacientes.html
    ├── turnos.html
    └── almacen.html
```

---

## 🚀 Instalación

### Requisitos
- Node.js (para ejecutar el servidor Silence)
- Un navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor local (Live Server, Python SimpleHTTPServer, etc.)

### Pasos

1. **Clonar o descargar el proyecto**
```bash
# O simplemente descargar los archivos
cd web/
```

2. **Iniciar un servidor local** (elige una opción)

**Opción A: Live Server (VS Code)**
```
1. Instala la extensión "Live Server"
2. Click derecho en index.html → "Open with Live Server"
```

**Opción B: Python 3**
```bash
python -m http.server 8000
# Luego abre http://localhost:8000
```

**Opción C: Node.js**
```bash
npx http-server
```

3. **Configurar la URL de API**

Abre `js/api-client.js` y actualiza la URL base:

```javascript
class APIClient {
    constructor(baseURL = 'http://localhost:3000/api') {  // ← Cambiar aquí
        this.baseURL = baseURL;
        // ...
    }
}
```

---

## ⚙️ Configuración

### Variables de Entorno

Si deseas usar variables de entorno, crea un archivo `.env` en la raíz:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Centro Médico
```

Y actualiza `api-client.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
```

### CORS

Asegúrate que tu backend Silence tenga CORS habilitado:

```javascript
// En tu servidor Silence
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:8000', 'http://localhost:3000'],
    credentials: true
}));
```

---

## 📱 Uso

### 1. **Acceder a la aplicación**

Abre `http://localhost:8000` en tu navegador

### 2. **Navegar por la página pública**

- **Inicio**: Información general del centro
- **Especialidades**: Ver todas las especialidades disponibles
- **Nosotros**: Conocer el equipo médico
- **Login**: Acceder con tu cuenta

### 3. **Iniciar Sesión (Paciente)**

Usuario: `paciente1`
Contraseña: `123456`

Acceso a:
- Dashboard con citas próximas
- Agendar nuevas citas
- Ver expediente completo
- Historial de citas y diagnósticos

### 4. **Iniciar Sesión (Empleado)**

Usuario: `doctor1`
Contraseña: `123456`

Acceso a:
- Dashboard administrativo
- Gestión de pacientes
- Control de turnos y citas
- Inventario de medicamentos

---

## 🔐 Credenciales de Prueba

| Rol | Usuario | Contraseña |
|-----|---------|-----------|
| 👤 Paciente | `paciente1` | `123456` |
| 👨‍⚕️ Empleado | `doctor1` | `123456` |

⚠️ **Nota**: Estas son credenciales de DEMOSTRACIÓN. En producción, usa credenciales seguras.

---

## 🔌 Endpoints API

### Autenticación
```
POST   /api/auth/login           # Login
POST   /api/auth/logout          # Logout
GET    /api/auth/verify          # Verificar sesión
```

### Usuarios
```
GET    /api/usuarios             # Obtener todos
GET    /api/usuarios/:id         # Obtener uno
POST   /api/usuarios             # Crear
PUT    /api/usuarios/:id         # Actualizar
DELETE /api/usuarios/:id         # Eliminar
```

### Pacientes
```
GET    /api/pacientes            # Obtener todos
GET    /api/pacientes/:id        # Obtener uno
GET    /api/pacientes/usuario/:usuarioId
POST   /api/pacientes            # Crear
PUT    /api/pacientes/:id        # Actualizar
DELETE /api/pacientes/:id        # Eliminar
```

### Citas Médicas
```
GET    /api/citas_medicas        # Obtener todas
GET    /api/citas_medicas/:id    # Obtener una
POST   /api/citas_medicas        # Crear
PUT    /api/citas_medicas/:id    # Actualizar
DELETE /api/citas_medicas/:id    # Eliminar
PATCH  /api/citas_medicas/:id/estado
```

### Inventario
```
GET    /api/inventario           # Obtener todos
GET    /api/inventario/:id       # Obtener uno
GET    /api/inventario/bajo-stock
GET    /api/inventario/vencidos
POST   /api/inventario           # Crear
PUT    /api/inventario/:id       # Actualizar
DELETE /api/inventario/:id       # Eliminar
PATCH  /api/inventario/:id/cantidad
```

---

## 📄 Archivos Creados

### HTML (Páginas)
- ✅ `index.html` - Página de inicio
- ✅ `especialidades.html` - Catálogo de especialidades
- ✅ `login.html` - Formulario de login
- ✅ `nosotros.html` - Información del centro
- ✅ `paciente/dashboard.html` - Panel del paciente
- ✅ `paciente/pedir-cita.html` - Agendar cita
- ✅ `paciente/expediente.html` - Expediente médico
- ✅ `empleado/almacen.html` - Gestión de inventario

### CSS (Estilos)
- ✅ `css/estilos.css` - Estilos generales
- ✅ `css/dashboard.css` - Estilos de dashboards
- ✅ `css/login.css` - Estilos del login
- ✅ `css/responsive.css` - Diseño responsivo

### JavaScript (Lógica)
- ✅ `js/api-client.js` - Cliente HTTP
- ✅ `js/auth.js` - Autenticación
- ✅ `js/main.js` - Funciones generales
- ✅ `js/login.js` - Lógica de login

---

## 🔧 Desarrollo

### Agregar nuevas funcionalidades

1. **Crear nuevo endpoint en API**
```javascript
// En api-client.js
async obtenerAlgo() {
    return this.request('GET', '/algo');
}
```

2. **Usar en el frontend**
```javascript
const datos = await api.obtenerAlgo();
```

3. **Manejar errores**
```javascript
try {
    const datos = await api.obtenerAlgo();
} catch (error) {
    console.error('Error:', error);
    mostrarAlerta('error', 'Ocurrió un error');
}
```

---

## 📊 Depuración

### Consola del navegador

Abre la consola (F12) para ver:
- ✅ Logs de API
- ✅ Errores de red
- ✅ Estado de sesión

### Ejemplos
```javascript
// Ver usuario actual
console.log(obtenerUsuarioActual());

// Ver token
console.log(obtenerToken());

// Hacer llamada de prueba
api.obtenerPacientes().then(d => console.log(d));
```

---

## 🎨 Personalización

### Colores
Edita en `css/estilos.css`:
```css
:root {
    --primary-color: #0066cc;      /* Azul principal */
    --secondary-color: #28a745;    /* Verde secundario */
    --warning-color: #ffc107;      /* Amarillo advertencia */
    --danger-color: #dc3545;       /* Rojo peligro */
}
```

### Fuentes
```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

### Logo
Edita en los archivos HTML:
```html
<h1>🏥 Centro Médico</h1>  <!-- Cambiar emoji o texto -->
```

---

## 📱 Responsive

La aplicación es completamente responsiva para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 🖥️ Desktop (1024px+)

---

## 🐛 Solución de Problemas

### "No puedo iniciar sesión"

1. ✅ Verifica que el backend esté corriendo
2. ✅ Comprueba la URL de API en `api-client.js`
3. ✅ Abre la consola (F12) para ver errores
4. ✅ Revisa los datos de las credenciales

### "La página se ve rota"

1. ✅ Limpia el caché del navegador (Ctrl+Shift+Delete)
2. ✅ Recarga la página (F5)
3. ✅ Verifica que los CSS estén cargando (Networks tab)

### "Los datos no se cargan"

1. ✅ Verifica CORS en el backend
2. ✅ Comprueba que los endpoints existan
3. ✅ Mira la pestaña Network en DevTools
4. ✅ Revisa los logs de la consola

---

## 📚 Recursos

- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [CSS-Tricks](https://css-tricks.com/)
- [Web.dev](https://web.dev/)

---

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## ✉️ Soporte

Para preguntas o reportar bugs, contacta al equipo de desarrollo.

---

**Última actualización**: 2 de Enero de 2026
**Versión**: 1.0.0
