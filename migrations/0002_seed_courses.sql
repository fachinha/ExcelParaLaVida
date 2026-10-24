-- Migración 0002: Seed de Cursos Iniciales en D1
-- Conforme a la información oficial de Excel Para La Vida

INSERT OR IGNORE INTO courses (id, name, description, badge, modality, is_active)
VALUES 
    (
        'principiantes',
        'Taller de Excel para Principiantes',
        'Aprendé a moverte en la planilla, usar atajos esenciales y dominar fórmulas cotidianas sin rodeos.',
        'Taller Insignia',
        'Presencial UNRN Bariloche',
        1
    ),
    (
        'intermedio-avanzado',
        'Taller de Excel Intermedio: Fórmulas y Datos',
        'Funciones lógicas avanzadas, búsquedas automáticas con BUSCARX y Tablas Dinámicas para reportes ejecutivos.',
        'Nivel Intermedio',
        'Presencial UNRN Bariloche / Híbrido',
        1
    ),
    (
        'talleres-a-medida',
        'Capacitaciones Especiales y a Medida',
        'Talleres diseñados según los requerimientos concretos de tu equipo, cátedra o área de trabajo.',
        'Institucional / Grupal',
        'Presencial o Virtual',
        1
    );
