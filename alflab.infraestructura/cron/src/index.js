const cron = require('node-cron');
const mysql = require('mysql2/promise');
const { checkReplicaStatus } = require('./replication-checker');
const { validateRecord } = require('./data-validator');

// ─── Configuración de conexiones ──────────────────────────────────
const masterConfig = {
  host:     process.env.MASTER_HOST     || 'alflab-mysql-master',
  port:     parseInt(process.env.MASTER_PORT) || 3306,
  user:     process.env.MYSQL_USER      || 'root',
  password: process.env.MYSQL_PASSWORD  || '',
  waitForConnections: true,
  connectionLimit: 5,
};

const replicaConfig = {
  host:     process.env.REPLICA_HOST    || 'alflab-mysql-replica',
  port:     parseInt(process.env.REPLICA_PORT) || 3306,
  user:     process.env.MYSQL_USER      || 'root',
  password: process.env.MYSQL_PASSWORD  || '',
  waitForConnections: true,
  connectionLimit: 5,
};

// Tablas que el CRON monitorea con su base de datos correspondiente
const MONITORED_TABLES = [
  { db: 'alflabcatalogos',  table: 'clientes'           },
  { db: 'alflabcatalogos',  table: 'proveedores'         },
  { db: 'alflabcatalogos',  table: 'usuarios'            },
  { db: 'alflaboperaciones', table: 'productos'          },
  { db: 'alflaboperaciones', table: 'cotizaciones'       },
  { db: 'alflaboperaciones', table: 'cotizacion_detalle' },
  { db: 'alflaboperaciones', table: 'usuarios'           },
];

let masterPool;
let replicaPool;

// ─── Tarea principal del CRON ─────────────────────────────────────
async function runCronJob() {
  const timestamp = new Date().toISOString();
  console.log(`\n[${timestamp}] ── Iniciando ciclo CRON ──`);

  // 1. Verificar estado de la réplica
  const replicaStatus = await checkReplicaStatus(replicaPool);

  if (!replicaStatus.isRunning) {
    console.warn(`[REPLICA] ⚠ Réplica detenida: ${replicaStatus.reason}`);
    console.warn(`[REPLICA] El CRON seguirá ejecutándose pero omitirá validaciones de réplica`);
    // El CRON no se detiene, solo reporta y continúa
  } else {
    console.log(`[REPLICA] ✓ Réplica activa. Segundos de retraso: ${replicaStatus.secondsBehind}`);
  }

  // 2. Validar datos en cada tabla monitorada
  let totalProcessed = 0;
  let totalVulnerable = 0;

  for (const { db, table } of MONITORED_TABLES) {
    try {
      const [rows] = await masterPool.execute(
        `SELECT * FROM \`${db}\`.\`${table}\` LIMIT 100`
      );

      for (const record of rows) {
        const { isClean, vulnerabilities } = validateRecord(table, record);
        totalProcessed++;

        if (!isClean) {
          totalVulnerable++;
          console.warn(`[SEGURIDAD] ⚠ Dato vulnerable en ${db}.${table}:`);
          vulnerabilities.forEach(v => {
            console.warn(`  → Campo: ${v.field} | Tipo: ${v.type} | Valor: ${v.value}`);
          });
          // El registro vulnerable NO se procesa, solo se reporta
          continue;
        }
      }

      console.log(`[OK] ${db}.${table} → ${rows.length} registros revisados`);

    } catch (error) {
      console.error(`[ERROR] No se pudo procesar ${db}.${table}: ${error.message}`);
    }
  }

  console.log(`\n[RESUMEN] Procesados: ${totalProcessed} | Vulnerables omitidos: ${totalVulnerable}`);
  console.log(`[${new Date().toISOString()}] ── Ciclo CRON completado ──\n`);
}

// ─── Arranque del servicio ────────────────────────────────────────
async function main() {
  console.log('Iniciando servicio CRON de AlfLab...');

  masterPool  = mysql.createPool(masterConfig);
  replicaPool = mysql.createPool(replicaConfig);

  // Ejecutar inmediatamente al arrancar
  await runCronJob();

  // Luego ejecutar cada 5 minutos
  cron.schedule('*/5 * * * *', async () => {
    await runCronJob();
  });

  console.log('CRON programado. Se ejecutará cada 5 minutos.');
}

main().catch(err => {
  console.error('Error fatal en el CRON:', err);
  process.exit(1);
});