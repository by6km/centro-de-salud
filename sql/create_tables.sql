-- ===============================================
-- 1. TABLA USUARIOS
-- ===============================================
CREATE TABLE usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    tipo_usuario ENUM('paciente', 'empleado') NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 2. TABLA ESPECIALIDADES
-- ===============================================
CREATE TABLE especialidades (
    especialidad_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    codigo VARCHAR(10) UNIQUE,
    activa BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 3. TABLA PACIENTES
-- ===============================================
CREATE TABLE pacientes (
    paciente_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nombre_completo VARCHAR(150) NOT NULL,
    apellidos VARCHAR(150) NOT NULL,
    numero_identidad VARCHAR(20) UNIQUE NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    sexo ENUM('M', 'F', 'Otro') NOT NULL,
    numero_telefono VARCHAR(15),
    tipo_sangre VARCHAR(5),
    alergias TEXT,
    enfermedades_cronicas TEXT,
    nombre_contacto_emergencia VARCHAR(150),
    telefono_contacto_emergencia VARCHAR(15),
    numero_seguro_medico VARCHAR(50),
    compania_seguro VARCHAR(100),
    direccion VARCHAR(255),
    ciudad VARCHAR(100),
    codigo_postal VARCHAR(10),
    provincia VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 4. TABLA EMPLEADOS
-- ===============================================
CREATE TABLE empleados (
    empleado_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nombre_completo VARCHAR(150) NOT NULL,
    apellidos VARCHAR(150) NOT NULL,
    numero_identidad VARCHAR(20) UNIQUE NOT NULL,
    especializacion VARCHAR(100),
    especialidad_id INT,
    numero_licencia_medica VARCHAR(50) UNIQUE,
    numero_telefono VARCHAR(15),
    email_laboral VARCHAR(100) UNIQUE,
    fecha_contratacion DATE NOT NULL,
    estado ENUM('activo', 'vacaciones', 'licencia', 'inactivo') DEFAULT 'activo',
    horarios_trabajo JSON,
    direccion VARCHAR(255),
    ciudad VARCHAR(100),
    codigo_postal VARCHAR(10),
    provincia VARCHAR(100),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (especialidad_id) REFERENCES especialidades(especialidad_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 5. TABLA EXPEDIENTES MEDICOS
-- ===============================================
CREATE TABLE expedientes_medicos (
    expediente_id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    peso_actual DECIMAL(5, 2),
    altura DECIMAL(5, 2),
    presion_arterial VARCHAR(20),
    frecuencia_cardiaca INT,
    temperatura DECIMAL(5, 2),
    indice_masa_corporal DECIMAL(5, 2),
    observaciones_medicas TEXT,
    diagnosticos_previos TEXT,
    medicamentos_actuales TEXT,
    operaciones_previas TEXT,
    vacunas JSON,
    fecha_ultima_consulta DATE,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(paciente_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 6. TABLA CITAS MEDICAS
-- ===============================================
CREATE TABLE citas_medicas (
    cita_id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    empleado_id INT NOT NULL,
    especialidad_id INT NOT NULL,
    fecha_cita DATE NOT NULL,
    hora_cita TIME NOT NULL,
    motivo_consulta TEXT NOT NULL,
    estado ENUM('pendiente', 'confirmada', 'realizada', 'cancelada', 'no_asistio') DEFAULT 'pendiente',
    notas_medicas TEXT,
    medicamentos_recetados TEXT,
    proxima_cita_recomendada DATE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(paciente_id) ON DELETE CASCADE,
    FOREIGN KEY (empleado_id) REFERENCES empleados(empleado_id),
    FOREIGN KEY (especialidad_id) REFERENCES especialidades(especialidad_id),
    UNIQUE KEY unique_cita (paciente_id, empleado_id, fecha_cita, hora_cita)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 7. TABLA INVENTARIO
-- ===============================================
CREATE TABLE inventario (
    inventario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_medicamento VARCHAR(150) NOT NULL,
    codigo_medicamento VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(100),
    cantidad_total INT NOT NULL,
    cantidad_minima INT DEFAULT 10,
    precio_unitario DECIMAL(10, 2),
    proveedor VARCHAR(150),
    fecha_vencimiento DATE,
    ubicacion_almacen VARCHAR(100),
    estado ENUM('disponible', 'bajo_stock', 'agotado', 'discontinuado') DEFAULT 'disponible',
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 8. TABLA MOVIMIENTOS INVENTARIO
-- ===============================================
CREATE TABLE movimientos_inventario (
    movimiento_id INT AUTO_INCREMENT PRIMARY KEY,
    inventario_id INT NOT NULL,
    cita_id INT,
    empleado_id INT,
    tipo_movimiento ENUM('entrada', 'salida', 'ajuste', 'descarte') NOT NULL,
    cantidad INT NOT NULL,
    motivo TEXT,
    fecha_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (inventario_id) REFERENCES inventario(inventario_id) ON DELETE CASCADE,
    FOREIGN KEY (cita_id) REFERENCES citas_medicas(cita_id) ON DELETE SET NULL,
    FOREIGN KEY (empleado_id) REFERENCES empleados(empleado_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 9. TABLA TURNOS EMPLEADOS
-- ===============================================
CREATE TABLE turnos_empleados (
    turno_id INT AUTO_INCREMENT PRIMARY KEY,
    empleado_id INT NOT NULL,
    fecha_turno DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    tipo_turno ENUM('mañana', 'tarde', 'noche') NOT NULL,
    confirmado BOOLEAN DEFAULT FALSE,
    notas TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (empleado_id) REFERENCES empleados(empleado_id) ON DELETE CASCADE,
    UNIQUE KEY unique_turno (empleado_id, fecha_turno)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 10. TABLA SERVICIOS Y CONSULTAS
-- ===============================================
CREATE TABLE servicios_consultas (
    servicio_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_servicio VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio_base DECIMAL(10, 2),
    duracion_estimada INT,
    especialidad_id INT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (especialidad_id) REFERENCES especialidades(especialidad_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- ===============================================
CREATE INDEX idx_usuarios_tipo ON usuarios(tipo_usuario);
CREATE INDEX idx_pacientes_usuario ON pacientes(usuario_id);
CREATE INDEX idx_empleados_usuario ON empleados(usuario_id);
CREATE INDEX idx_empleados_especialidad ON empleados(especialidad_id);
CREATE INDEX idx_citas_paciente ON citas_medicas(paciente_id);
CREATE INDEX idx_citas_empleado ON citas_medicas(empleado_id);
CREATE INDEX idx_citas_estado ON citas_medicas(estado);
CREATE INDEX idx_citas_fecha ON citas_medicas(fecha_cita);
CREATE INDEX idx_expedientes_paciente ON expedientes_medicos(paciente_id);
CREATE INDEX idx_inventario_codigo ON inventario(codigo_medicamento);
CREATE INDEX idx_movimientos_inventario ON movimientos_inventario(inventario_id);
CREATE INDEX idx_movimientos_fecha ON movimientos_inventario(fecha_movimiento);
CREATE INDEX idx_turnos_empleado ON turnos_empleados(empleado_id);
CREATE INDEX idx_turnos_fecha ON turnos_empleados(fecha_turno);