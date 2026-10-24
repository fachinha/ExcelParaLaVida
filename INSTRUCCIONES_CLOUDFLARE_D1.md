# 🚀 Guía de Despliegue y Administración: Cloudflare Pages + D1

Esta guía contiene los pasos exactos y comandos para ejecutar localmente, configurar la base de datos **Cloudflare D1** y poner en producción el sistema de inscripciones de **Excel Para La Vida**.

---

## 1. Comandos para Desarrollo Local

El proyecto ya está completamente configurado para probar localmente con SQLite/D1 emulado:

### 1.1 Iniciar el frontend en desarrollo
```bash
npm run dev
```
Abre la web en `http://localhost:5173/`.

### 1.2 Ejecutar migraciones en base local (SQLite)
```bash
npm run d1:migrate:local
```
Aplica el esquema `0001_initial_schema.sql` y el seed de cursos `0002_seed_courses.sql`.

### 1.3 Crear los 4 usuarios docentes en local
```bash
npm run d1:seed:local
```
Genera las cuatro cuentas con hash seguro PBKDF2-SHA256:
- `docente1@excelparalavida.com` (Docente Coordinador, Admin)
- `docente2@excelparalavida.com` (Docente Fórmulas, Instructor)
- `docente3@excelparalavida.com` (Docente Datos y Reportes, Instructor)
- `docente4@excelparalavida.com` (Docente Tutoría y Soporte, Instructor)  
*Contraseña inicial de desarrollo:* `PasswordSeguro2026!`

### 1.4 Simular servidor Cloudflare Pages Functions con D1
```bash
npm run build
npm run pages:dev
```
Inicia el entorno de ejecución de Cloudflare Workers/Pages Functions con el binding de D1 localmente.

---

## 2. Configuración en Producción (Cloudflare Dashboard)

### Paso 1: Iniciar sesión en Cloudflare CLI
```bash
npx wrangler login
```

### Paso 2: Crear la base de datos D1 en Cloudflare
```bash
npx wrangler d1 create excel-para-la-vida-db
```
Wrangler te devolverá un resultado similar a:
```toml
[[d1_databases]]
binding = "DB"
database_name = "excel-para-la-vida-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### Paso 3: Actualizar `wrangler.toml`
Copiá el `database_id` real obtenido en el archivo `wrangler.toml` reemplazando los ceros (`00000000-0000...`).

### Paso 4: Vincular D1 en Cloudflare Pages Dashboard
1. Ingresá a [dash.cloudflare.com](https://dash.cloudflare.com/) > **Workers & Pages**.
2. Seleccioná tu proyecto de Pages (**excel-para-la-vida**).
3. Dirigite a **Settings** > **Functions** > **D1 database bindings**.
4. Hacé clic en **Add binding**:
   - Variable name: `DB`
   - D1 database: `excel-para-la-vida-db`
5. Guardá los cambios.

### Paso 5: Aplicar migraciones en Cloudflare D1 (Producción)
```bash
npm run d1:migrate:remote
```
Aplica las tablas `courses`, `enrollments`, `admin_users`, `admin_sessions` y `contact_logs` en los servidores globales de Cloudflare.

### Paso 6: Crear los 4 administradores en Producción
```bash
npm run d1:seed:remote
```
> [!IMPORTANT]
> Podés editar las contraseñas antes de ejecutar el comando en `scripts/seed_admin_users.js` o pedir a cada docente que ingrese con la contraseña provisoria y cambiarla. Las contraseñas viajan hasheadas con PBKDF2 y nunca se almacenan en texto plano.

### Paso 7: Desplegar el proyecto a Cloudflare Pages
Si el proyecto está conectado con **GitHub**, cada `git push` a la rama principal desplegará automáticamente.

Para desplegar directamente por consola:
```bash
npm run build
npx wrangler pages deploy dist --project-name excel-para-la-vida
```

---

## 3. Acceso al Panel Docente Privado

1. Ingresá a:  
   `https://<tu-dominio>.pages.dev/admin` (o en local `http://localhost:5173/admin`).
2. Iniciá sesión con cualquiera de los cuatro correos docentes y su contraseña.
3. Desde el panel podrás:
   - Ver indicadores en tiempo real (Inscripciones totales, nuevas, en diálogo, confirmadas).
   - Filtrar y buscar alumnos por nombre, teléfono o correo.
   - Abrir el WhatsApp pre-formateado de cada alumno (con confirmación de envío).
   - Asignar a uno de los 4 docentes como responsable.
   - Registrar llamadas, mensajes y notas en la línea de tiempo.
   - Exportar la nómina a formato CSV con un clic.

---

## 4. Política de Copias de Seguridad (Backups)

### 4.1 Exportar respaldo de producción
Para realizar un backup de la base de datos D1 en formato SQL:
```bash
npx wrangler d1 export excel-para-la-vida-db --remote --output ./backup_$(date +%Y%m%d).sql
```
> [!CAUTION]
> **No subir el archivo de backup a repositorios Git públicos**, ya que contiene datos personales (nombres, teléfonos y correos de alumnos). Almacenar los backups en un almacenamiento cifrado o local seguro.

### 4.2 Restaurar un respaldo en caso de emergencia
Para restaurar la base de datos desde un archivo SQL previamente exportado:
```bash
npx wrangler d1 execute excel-para-la-vida-db --remote --file ./backup_fecha.sql -y
```

### 4.3 Frecuencia sugerida de respaldo
- **Durante convocatorias abiertas:** 1 backup semanal o tras el cierre de cada tanda de inscripciones.
- **En períodos intermedios:** 1 backup mensual.
