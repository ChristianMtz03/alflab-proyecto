#!/bin/bash
echo "Esperando a que el master esté completamente listo..."
sleep 15

echo "Configurando la replicación..."
mysql -h alflab-mysql-master -uroot -p${MYSQL_ROOT_PASSWORD} <<EOF
CREATE USER IF NOT EXISTS 'replicator'@'%' IDENTIFIED WITH mysql_native_password BY 'ReplicaPass2026!';
GRANT REPLICATION SLAVE ON *.* TO 'replicator'@'%';
FLUSH PRIVILEGES;
EOF

echo "Obteniendo posición actual del master..."
MASTER_STATUS=$(mysql -h alflab-mysql-master -uroot -p${MYSQL_ROOT_PASSWORD} -e "SHOW MASTER STATUS\G")
MASTER_FILE=$(echo "$MASTER_STATUS" | grep "File:" | awk '{print $2}')
MASTER_POS=$(echo "$MASTER_STATUS" | grep "Position:" | awk '{print $2}')

echo "Master file: $MASTER_FILE, Position: $MASTER_POS"

echo "Configurando la réplica..."
mysql -h alflab-mysql-replica -uroot -p${MYSQL_ROOT_PASSWORD} <<EOF
STOP REPLICA;
CHANGE REPLICATION SOURCE TO
  SOURCE_HOST='alflab-mysql-master',
  SOURCE_USER='replicator',
  SOURCE_PASSWORD='ReplicaPass2026!',
  SOURCE_LOG_FILE='$MASTER_FILE',
  SOURCE_LOG_POS=$MASTER_POS;
START REPLICA;
EOF

echo "Verificando estado de la réplica..."
mysql -h alflab-mysql-replica -uroot -p${MYSQL_ROOT_PASSWORD} -e "SHOW REPLICA STATUS\G"

echo "Replicación configurada correctamente."