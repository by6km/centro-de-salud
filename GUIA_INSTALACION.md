# 📖 Guía Paso a Paso - Centro Médico con Silence

Sigue estos pasos en orden para implementar el proyecto correctamente.

## ⏱️ Tiempo estimado: 30-45 minutos

---

## PASO 1: Instalación de Silence (5 minutos)

### 1.1 Instalar Python (si no lo tienes)
- Descarga desde https://www.python.org/downloads/
- **Importante**: Marca "Add Python to PATH" durante la instalación

### 1.2 Verificar Python
Abre una terminal/PowerShell y ejecuta:
```bash
python --version
```

Deberías ver algo como: `Python 3.x.x`

### 1.3 Instalar Silence
```bash
pip install Silence
```

### 1.4 Verificar que Silence se instaló
```bash
silence --version
```

---

## PASO 2: Crear el Proyecto Base (3 minutos)

### 2.1 Crear proyecto
En el directorio donde quieras el proyecto:
```bash
silence new centro_medico
cd centro_medico
```

### 2.2 Ver estructura generada
Deberías tener:
```
centro_medico/
├── settings.py
├── run.py
├── sql/
│   └── (vacío, agregaremos aquí)
├── endpoints/
│   └── (vacío, agregaremos aquí)
├── docs/
│   ├── index.html
│   ├── css/
│   └── js/
└── tests/
```

---

## PASO 3: Configurar la Base de Datos (10 minutos)

### 3.1 Crear la BD en MariaDB/MySQL

**Con HeidiSQL**:
1. Abre HeidiSQL
2. Conéctate al servidor
3. Click derecho en "tu_servidor" → "Crear nuevo" → "Base de datos"
4. Nombre: `centro_medico`
5. Cotejamiento: `utf8mb4_unicode_ci`
6. Click "Aceptar"

**O con línea de comandos**:
```bash
mysql -u root -p
```
```sql
CREATE DATABASE centro_medico 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 3.2 Actualizar settings.py

En el archivo `centro_medico/settings.py`, busca `DB_CONN` y actualiza:

```python
DB_CONN = {
    "host": "127.0.0.1",
    "port": 3306,
    "username": "root",          # Tu usuario MySQL
    "password": "",              # Tu contraseña (si tienes)
    "database": "centro_medico"
}
```

**Si usas contraseña en MySQL**:
```python
"password": "tu_contraseña_aqui"
```

---

## PASO 4: Crear los Scripts SQL (5 minutos)

### 4.1 Copiar archivo de creación de tablas

1. Crea carpeta: `centro_medico/sql/`
2. Crea archivo: `centro_medico/sql/01_create_tables.sql`
3. Copia TODO el contenido del archivo SQL proporcionado

### 4.2 Copiar archivo de datos de ejemplo

1. Crea archivo: `centro_medico/sql/02_populate_data.sql`
2. Copia TODO el contenido del archivo SQL de población

### 4.3 Verificar en settings.py

Asegúrate de que en `settings.py` esté configurado:

```python
SQL_SCRIPTS = [
    "01_create_tables.sql",
    "02_populate_data.sql"
]
```

### 4.4 Crear tablas

Ejecuta en terminal:
```bash
silence createdb
```

**Esperado**: Verás un mensaje como "Database created successfully"

---

## PASO 5: Crear los Endpoints (15 minutos)

### 5.1 Crear carpeta endpoints

```bash
mkdir endpoints
```

(Si no existe ya)

### 5.2 Copiar los archivos de endpoints

Copia estos archivos a `centro_medico/endpoints/`:

1. **usuarios.py** - Autenticación y gestión de usuarios
2. **pacientes.py** - Gestión de pacientes
3. **especialidades.py** - Especialidades médicas
4. **citas.py** - Gestión de citas
5. **expedientes.py** - Expedientes médicos
6. **empleados.py** - Empleados y turnos
7. **inventario.py** - Medicamentos

**Importante**: 
- Respeta exactamente los nombres de los archivos
- Respeta la estructura de carpetas
- No cambies los nombres de las funciones

### 5.3 Verificar estructura

Tu carpeta `endpoints/` debe lucir así:
```
endpoints/
├── usuarios.py
├── pacientes.py
├── especialidades.py
├── citas.py
├── expedientes.py
├── empleados.py
└── inventario.py
```

---

## PASO 6: Configuración Final (3 minutos)

### 6.1 Actualizar settings.py - Configuración de Autenticación

En `settings.py`, verifica estas líneas:

```python
ENABLE_LOGIN = True              # Login habilitado
ENABLE_REGISTER = True           # Registro habilitado

USER_AUTH_DATA = {
    "table": "usuarios",
    "identifier": "nombre_usuario",
    "password": "contrasena"
}
```

### 6.2 Verificar PORT (opcional)

Si quieres cambiar el puerto (por defecto 8080):

```python
HTTP_PORT = 8080  # Cambia aquí si lo deseas
```

---

## PASO 7: Ejecutar el Servidor (2 minutos)

### 7.1 Inicia el servidor

Desde la carpeta `centro_medico`:
```bash
silence run
```

### 7.2 Esperado

Verás algo como:
```
 * Serving Flask app 'Silence'
 * Running on http://0.0.0.0:8080
```

### 7.3 Accede a tu aplicación

- **Web**: http://localhost:8080
- **API**: http://localhost:8080/api

---

## PASO 8: Probar Autenticación (5 minutos)

### 8.1 Usando Postman (Recomendado)

1. Descarga Postman: https://www.postman.com/downloads/
2. Crea una nueva petición:

**Tipo**: POST
**URL**: `http://localhost:8080/api/login`
**Headers**: 
```
Content-Type: application/json
```
**Body** (JSON):
```json
{
  "nombre_usuario": "paciente1",
  "contrasena": "123456"
}
```

3. Click "Send"
4. Deberías recibir:
```json
{
  "sessionToken": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "usuario_id": 1,
    "nombre_usuario": "paciente1",
    "tipo_usuario": "paciente"
  }
}
```

### 8.2 Usando cURL

```bash
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d "{\"nombre_usuario\":\"paciente1\",\"contrasena\":\"123456\"}"
```

### 8.3 Copiar el Token

Copia todo el valor de `sessionToken` (sin las comillas)

---

## PASO 9: Usar Token para Peticiones Protegidas (5 minutos)

### 9.1 Con Postman

1. Nueva petición: GET
2. URL: `http://localhost:8080/api/pacientes`
3. Headers:
   ```
   Token: TU_TOKEN_AQUI
   ```
4. Click "Send"

Deberías ver la lista de pacientes.

### 9.2 Con cURL

```bash
curl -H "Token: TU_TOKEN_AQUI" http://localhost:8080/api/pacientes
```

---

## PASO 10: Verificar que Todo Funciona

### 10.1 Listar todos los endpoints

```
GET http://localhost:8080/api
```

Deberías ver lista completa de endpoints disponibles.

### 10.2 Pruebas Rápidas

**Crear una cita** (POST):
```json
{
  "paciente_id": 1,
  "empleado_id": 1,
  "especialidad_id": 1,
  "fecha_cita": "2025-02-15",
  "hora_cita": "14:30:00",
  "motivo_consulta": "Consulta general"
}
```

**Actualizar inventario** (PUT):
```json
{
  "cantidad_total": 500
}
```

---

## 🎉 ¡LISTO!

Tu sistema está completamente funcional. Puedes:

✅ Hacer login/logout
✅ Ver pacientes y empleados
✅ Crear y gestionar citas
✅ Visualizar expedientes
✅ Controlar inventario
✅ Gestionar turnos

---

## 🐛 Solución de Problemas Comunes

### "Error: Module not found 'silence'"
```bash
pip install --upgrade Silence
```

### "Connection refused to MySQL"
1. Verifica que MariaDB/MySQL esté corriendo
2. Verifica las credenciales en `settings.py`

### "Syntax error in SQL"
1. Verifica que copiaste EXACTAMENTE los scripts SQL
2. Borra la BD y vuelve a crearla

### "Token inválido"
1. Asegúrate de copiar TODO el token (sin espacios)
2. El token caduca después de 24 horas

### "404 Not Found" en endpoints
1. Verifica que el nombre del endpoint sea exacto
2. Verifica que copiaste el archivo `.py` correctamente

---

## 📞 Próximos Pasos

Una vez que funcione:

1. **Personaliza el frontend** en la carpeta `docs/`
2. **Agrega más especialidades** en `02_populate_data.sql`
3. **Implementa email** para notificaciones de citas
4. **Genera reportes** en PDF
5. **Añade gráficos** de estadísticas

---

**¡Feliz codificación!** 🚀
