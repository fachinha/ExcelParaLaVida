# 📋 Datos a Confirmar antes del Lanzamiento Público

Este archivo documenta los datos específicos del equipo de **Excel Para La Vida** que deben confirmarse para la publicación definitiva del sitio web oficial.

---

### 1. 📱 Número de WhatsApp Oficial
- **Ubicación en el código**: `src/data/siteConfig.ts` -> campo `whatsappNumber`.
- **Estado actual**: Preparado para abrir WhatsApp con mensajes preconfigurados por curso.
- **Acción requerida**: Ingresar el número con código de país y área (sin ceros ni guiones).  
  *Ejemplo para Bariloche*: `"5492944123456"`.

---

### 2. 👥 Nombres y Fotografías de los 4 Integrantes
- **Ubicación en el código**: `src/data/team.ts` -> array `members`.
- **Ubicación para imágenes**: Guardar las 4 fotos en `public/team/` (ej: `docente1.jpg`, `docente2.jpg`, etc.).
- **Estado actual**: Se diseñaron 4 fichas editoriales con roles docentes pedagógicos estructurados (Coordinador, Automatización/Fórmulas, Tablas Dinámicas/Dashboards, Tutoría/Soporte).
- **Acción requerida**: Reemplazar los textos de marcador por los nombres reales de los cuatro integrantes, sus fotos oficiales y cualquier detalle adicional de su trayectoria en la UNRN.

---

### 3. 🗓️ Próxima Convocatoria de Talleres (Fechas y Aranceles)
- **Ubicación en el código**: `src/data/courses.ts`.
- **Estado actual**: Los cursos detallan la modalidad ("Presencial en Sede UNRN Bariloche" / "Híbrido"), el temario completo, materiales incluidos y la aclaración "Arancel accesible universitario · Consultar por mensaje".
- **Acción requerida**: Si ya tienen definidas las fechas exactas de la próxima cohorte (ej: *"Sábados de Noviembre 10:00 a 13:00 hs"*), actualizar los campos `schedule` y `statusText`.

---

### 4. 📝 Formulario de Inscripción Externo (Opcional)
- Si para las ediciones universitarias utilizan un **Google Form** oficial de la UNRN o propio, pueden agregar el enlace directamente en `src/data/courses.ts` o en los botones de acción.

---

### 💡 Todo centralizado en `src/data/`
Toda la información del sitio está desacoplada de los componentes visuales:
- `src/data/siteConfig.ts`: Redes, WhatsApp, datos institucionales.
- `src/data/courses.ts`: Cursos, modalidades y aranceles.
- `src/data/curriculum.ts`: Módulos y fórmulas del temario.
- `src/data/team.ts`: Perfiles docentes.
- `src/data/faq.ts`: Preguntas y respuestas frecuentes.
