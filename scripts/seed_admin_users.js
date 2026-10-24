/**
 * Script de inicialización de usuarios administradores para Excel Para La Vida.
 * Genera contraseñas con hash PBKDF2-SHA256 y salt criptográfico de 16 bytes.
 * 
 * Uso:
 *   node scripts/seed_admin_users.js [--local | --remote]
 */

import crypto from 'node:crypto';
import { execSync } from 'node:child_process';

// Cuentas individuales de los 4 integrantes del equipo
// En producción, cada docente puede definir su propia contraseña segura ejecutando este script.
const DEFAULT_USERS = [
  {
    id: "usr_docente_1",
    name: "Docente Coordinador",
    email: "docente1@excelparalavida.com",
    password: "PasswordSeguro2026!",
    role: "admin"
  },
  {
    id: "usr_docente_2",
    name: "Docente Fórmulas",
    email: "docente2@excelparalavida.com",
    password: "PasswordSeguro2026!",
    role: "instructor"
  },
  {
    id: "usr_docente_3",
    name: "Docente Datos y Reportes",
    email: "docente3@excelparalavida.com",
    password: "PasswordSeguro2026!",
    role: "instructor"
  },
  {
    id: "usr_docente_4",
    name: "Docente Tutoría y Soporte",
    email: "docente4@excelparalavida.com",
    password: "PasswordSeguro2026!",
    role: "instructor"
  }
];

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256').toString('hex');
  return { salt, hash };
}

export function generateSeedSQL(users = DEFAULT_USERS) {
  let sql = "-- Seed de usuarios administradores con contraseñas seguras\n";
  for (const user of users) {
    const { salt, hash } = hashPassword(user.password);
    sql += `INSERT OR REPLACE INTO admin_users (id, name, email, password_hash, password_salt, role, is_active) VALUES ('${user.id}', '${user.name}', '${user.email.toLowerCase()}', '${hash}', '${salt}', '${user.role}', 1);\n`;
  }
  return sql;
}

// Ejecución directa si se invoca desde la consola
if (process.argv[1]?.endsWith('seed_admin_users.js')) {
  const isLocal = !process.argv.includes('--remote');
  console.log(`Generando usuarios administradores (${isLocal ? 'LOCAL' : 'REMOTE D1'})...`);
  
  const sql = generateSeedSQL();
  console.log("\nSQL generado:");
  console.log(sql);

  const fs = await import('node:fs');
  const path = await import('node:path');
  const sqlFile = path.resolve('migrations', 'seed_admins.sql');
  fs.writeFileSync(sqlFile, sql, 'utf-8');
  console.log(`Guardado en: ${sqlFile}`);

  const flag = isLocal ? '--local' : '--remote';
  const command = `npx wrangler d1 execute excel-para-la-vida-db ${flag} --file ./migrations/seed_admins.sql -y`;
  
  try {
    console.log(`\nEjecutando en D1 (${flag})...`);
    execSync(command, { stdio: 'inherit' });
    console.log("✅ Usuarios administradores creados exitosamente en D1.");
  } catch {
    console.log("\n⚠️ No se pudo ejecutar automáticamente mediante Wrangler.");
    console.log(`Podés ejecutar manualmente: npx wrangler d1 execute excel-para-la-vida-db ${flag} --file ./migrations/seed_admins.sql`);
  }
}
