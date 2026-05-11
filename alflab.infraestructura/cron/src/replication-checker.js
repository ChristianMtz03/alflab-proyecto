// ─── Verificador de estado de la réplica ──────────────────────────

async function checkReplicaStatus(replicaPool) {
  try {
    const [rows] = await replicaPool.execute('SHOW REPLICA STATUS');
    
    if (!rows || rows.length === 0) {
      return { isRunning: false, reason: 'No hay configuración de réplica' };
    }

    const status = rows[0];
    const ioRunning = status['Replica_IO_Running'] === 'Yes';
    const sqlRunning = status['Replica_SQL_Running'] === 'Yes';

    return {
      isRunning: ioRunning && sqlRunning,
      ioRunning,
      sqlRunning,
      secondsBehind: status['Seconds_Behind_Source'],
      reason: !ioRunning ? 'IO Thread detenido' : !sqlRunning ? 'SQL Thread detenido' : null
    };
  } catch (error) {
    return { isRunning: false, reason: `Error al conectar con réplica: ${error.message}` };
  }
}

module.exports = { checkReplicaStatus };