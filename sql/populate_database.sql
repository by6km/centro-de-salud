-- ===============================================
-- 1. INSERTAR USUARIOS DE PRUEBA
-- ===============================================

-- Usuarios pacientes (contraseña: 123456)
INSERT INTO usuarios (nombre_usuario, contrasena, email, tipo_usuario) VALUES
('paciente1', 'pbkdf2:sha256:600000$ABC$DEF1234567890', 'paciente1@gmail.com', 'paciente'),
('paciente2', 'pbkdf2:sha256:600000$ABC$DEF1234567890', 'paciente2@gmail.com', 'paciente'),
('paciente3', 'pbkdf2:sha256:600000$ABC$DEF1234567890', 'paciente3@gmail.com', 'paciente');

-- Usuarios empleados (contraseña: 123456)
INSERT INTO usuarios (nombre_usuario, contrasena, email, tipo_usuario) VALUES
('doctor1', 'pbkdf2:sha256:600000$ABC$DEF1234567890', 'doctor1@centromedico.com', 'empleado'),
('doctor2', 'pbkdf2:sha256:600000$ABC$DEF1234567890', 'doctor2@centromedico.com', 'empleado'),
('enfermero1', 'pbkdf2:sha256:600000$ABC$DEF1234567890', 'enfermero1@centromedico.com', 'empleado'),
('admin', 'pbkdf2:sha256:600000$ABC$DEF1234567890', 'admin@centromedico.com', 'empleado');

-- ===============================================
-- 2. INSERTAR ESPECIALIDADES
-- ===============================================
INSERT INTO especialidades (nombre, descripcion, codigo) VALUES
('Cardiología', 'Especialidad dedicada al corazón y sistema cardiovascular', 'CAR001'),
('Dermatología', 'Especialidad dedicada a la piel y sus enfermedades', 'DER001'),
('Oftalmología', 'Especialidad dedicada a los ojos y visión', 'OFT001'),
('Pediatría', 'Especialidad dedicada a la medicina infantil', 'PED001'),
('Medicina General', 'Consultas generales y diagnóstico inicial', 'MED001'),
('Traumatología', 'Especialidad dedicada a huesos y lesiones', 'TRA001'),
('Psicología', 'Especialidad dedicada a la salud mental', 'PSI001'),
('Odontología', 'Especialidad dedicada a la salud dental', 'ODO001');

-- ===============================================
-- 3. INSERTAR PACIENTES
-- ===============================================
INSERT INTO pacientes (usuario_id, nombre_completo, apellidos, numero_identidad, fecha_nacimiento, sexo, numero_telefono, tipo_sangre, alergias, enfermedades_cronicas, nombre_contacto_emergencia, telefono_contacto_emergencia, numero_seguro_medico, compania_seguro, direccion, ciudad, codigo_postal, provincia) VALUES
(1, 'Juan', 'García López', '12345678A', '1985-05-15', 'M', '600123456', 'O+', 'Penicilina', 'Diabetes tipo 2', 'María García', '600234567', 'SEG001', 'Adeslas', 'Calle Principal 123', 'Dos Hermanas', '41700', 'Sevilla'),
(2, 'Ana', 'Martínez Rodríguez', '87654321B', '1990-08-22', 'F', '600234567', 'A+', 'Ninguna', 'Hipertensión', 'Carlos Martínez', '600345678', 'SEG002', 'Sanitas', 'Avenida Central 456', 'Dos Hermanas', '41700', 'Sevilla'),
(3, 'Carlos', 'López Sánchez', '11223344C', '1988-03-10', 'M', '600345678', 'B-', 'Sulfamidas', 'Asma', 'Rosa López', '600456789', 'SEG003', 'Mapfre', 'Calle Secundaria 789', 'Dos Hermanas', '41700', 'Sevilla');

-- ===============================================
-- 4. INSERTAR EMPLEADOS
-- ===============================================
INSERT INTO empleados (usuario_id, nombre_completo, apellidos, numero_identidad, especializacion, especialidad_id, numero_licencia_medica, numero_telefono, email_laboral, fecha_contratacion, estado, horarios_trabajo) VALUES
(4, 'Dr. Luis', 'Fernández García', '99887766D', 'Cardiología', 1, 'LIC001', '600567890', 'doctor1@centromedico.com', '2019-01-15', 'activo', '{"lunes": "09:00-17:00", "martes": "09:00-17:00", "miercoles": "09:00-14:00"}'),
(5, 'Dra. Elena', 'Rodríguez Martínez', '88776655E', 'Pediatría', 4, 'LIC002', '600678901', 'doctor2@centromedico.com', '2020-03-20', 'activo', '{"lunes": "10:00-18:00", "martes": "10:00-18:00", "viernes": "10:00-18:00"}'),
(6, 'Enf. Patricia', 'Sánchez López', '77665544F', 'Enfermería General', 5, NULL, '600789012', 'enfermero1@centromedico.com', '2021-06-10', 'activo', '{"lunes": "08:00-16:00", "martes": "08:00-16:00", "miercoles": "08:00-16:00"}');

-- ===============================================
-- 5. INSERTAR EXPEDIENTES MEDICOS
-- ===============================================
INSERT INTO expedientes_medicos (paciente_id, peso_actual, altura, presion_arterial, frecuencia_cardiaca, temperatura, indice_masa_corporal, observaciones_medicas, diagnosticos_previos, medicamentos_actuales, operaciones_previas, fecha_ultima_consulta) VALUES
(1, 78.5, 180.0, '130/85', 72, 36.5, 24.2, 'Paciente con buen estado general', 'Diabetes tipo 2, Hipercolesterolemia', 'Metformina 500mg, Atorvastatina 20mg', 'Apendicectomía (2010)', '2024-12-10'),
(2, 65.0, 168.0, '120/80', 68, 36.6, 23.0, 'Sin complicaciones relevantes', 'Migraña crónica', 'Sumatriptán según sea necesario', 'Ninguna', '2024-12-05'),
(3, 82.0, 178.0, '125/82', 70, 36.4, 25.9, 'Paciente con asma controlada', 'Asma intermitente', 'Salbutamol inhalado', 'Ninguna', '2024-11-28');

-- ===============================================
-- 6. INSERTAR CITAS MEDICAS
-- ===============================================
INSERT INTO citas_medicas (paciente_id, empleado_id, especialidad_id, fecha_cita, hora_cita, motivo_consulta, estado, notas_medicas) VALUES
(1, 1, 1, '2025-01-10', '10:00:00', 'Revisión de controles de diabetes', 'confirmada', 'Paciente presenta valores estables'),
(2, 2, 4, '2025-01-12', '14:30:00', 'Consulta pediátrica de rutina', 'confirmada', 'Vacunación completa'),
(3, 1, 1, '2025-01-15', '11:00:00', 'Control cardiológico periódico', 'pendiente', 'Primera cita con el especialista'),
(1, 2, 5, '2025-01-20', '09:30:00', 'Consulta de medicina general', 'pendiente', 'Seguimiento general');

-- ===============================================
-- 7. INSERTAR INVENTARIO (MEDICAMENTOS)
-- ===============================================
INSERT INTO inventario (nombre_medicamento, codigo_medicamento, descripcion, categoria, cantidad_total, cantidad_minima, precio_unitario, proveedor, fecha_vencimiento, ubicacion_almacen, estado) VALUES
('Aspirina 500mg', 'ASP001', 'Analgésico y antiinflamatorio', 'Analgésicos', 500, 50, 0.25, 'Farma Global', '2026-06-30', 'Estantería A1', 'disponible'),
('Amoxicilina 500mg', 'AMX001', 'Antibiótico de amplio espectro', 'Antibióticos', 300, 50, 1.50, 'Farma Global', '2025-12-31', 'Estantería B2', 'disponible'),
('Ibuprofeno 400mg', 'IBU001', 'Analgésico antiinflamatorio', 'Analgésicos', 250, 50, 0.40, 'Laboratorios BETA', '2026-03-15', 'Estantería A2', 'disponible'),
('Metformina 500mg', 'MET001', 'Medicamento antidiabético', 'Endocrino', 180, 50, 0.80, 'Farma Global', '2025-11-20', 'Estantería C1', 'disponible'),
('Atorvastatina 20mg', 'ATO001', 'Estatina para colesterol', 'Cardiovascular', 150, 40, 1.20, 'Laboratorios BETA', '2026-01-10', 'Estantería C2', 'disponible'),
('Suero fisiológico 500ml', 'SUE001', 'Solución salina estéril', 'Sueros y soluciones', 100, 30, 2.00, 'Soluciones Médicas', '2026-12-31', 'Estantería D1', 'disponible'),
('Vendaje elástico 5cm', 'VEN001', 'Vendaje de algodón elástico', 'Material de cura', 200, 50, 1.50, 'Materiales Médicos S.A.', '2027-06-30', 'Estantería E1', 'disponible'),
('Paracetamol 500mg', 'PAR001', 'Analgésico antipirético', 'Analgésicos', 400, 60, 0.30, 'Farma Global', '2026-02-28', 'Estantería A3', 'disponible');

-- ===============================================
-- 8. INSERTAR SERVICIOS Y CONSULTAS
-- ===============================================
INSERT INTO servicios_consultas (nombre_servicio, descripcion, precio_base, duracion_estimada, especialidad_id) VALUES
('Consulta General', 'Consulta médica general sin especialidad', 30.00, 20, 5),
('Consulta Cardiología', 'Consulta con especialista en cardiología', 60.00, 30, 1),
('Consulta Pediatría', 'Consulta pediátrica para menores', 40.00, 25, 4),
('Consulta Dermatología', 'Evaluación y tratamiento dermatológico', 50.00, 30, 2),
('Electrocardiograma', 'Prueba de electrocardiografía', 35.00, 15, 1),
('Análisis de sangre', 'Extracción y análisis de sangre', 25.00, 10, 5),
('Vacunación infantil', 'Vacunas según calendario de vacunación', 20.00, 15, 4),
('Evaluación oftalmológica', 'Revisión ocular completa', 45.00, 30, 3);

-- ===============================================
-- 9. INSERTAR TURNOS EMPLEADOS
-- ===============================================
INSERT INTO turnos_empleados (empleado_id, fecha_turno, hora_inicio, hora_fin, tipo_turno, confirmado) VALUES
(1, '2025-01-10', '09:00:00', '17:00:00', 'mañana', TRUE),
(1, '2025-01-11', '09:00:00', '17:00:00', 'mañana', TRUE),
(2, '2025-01-10', '10:00:00', '18:00:00', 'mañana', TRUE),
(2, '2025-01-12', '10:00:00', '18:00:00', 'mañana', FALSE),
(3, '2025-01-10', '08:00:00', '16:00:00', 'mañana', TRUE),
(3, '2025-01-11', '08:00:00', '16:00:00', 'mañana', TRUE),
(3, '2025-01-13', '08:00:00', '16:00:00', 'mañana', TRUE);
