// ─── Validador de datos vulnerables ───────────────────────────────
// Este módulo identifica datos peligrosos antes de procesarlos

const SQL_INJECTION_PATTERNS = [
  /(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bTRUNCATE\b)/i,
  /(--|;|'|"|\bOR\b\s+\d+=\d+|\bAND\b\s+\d+=\d+)/i,
  /(\bUNION\b|\bEXEC\b|\bEXECUTE\b|\bxp_\w+)/i,
];

const XSS_PATTERNS = [
  /<script[\s\S]*?>[\s\S]*?<\/script>/i,
  /<[^>]+on\w+\s*=\s*["'][^"']*["']/i,
  /<(iframe|object|embed|link|meta)[^>]*>/i,
  /javascript\s*:/i,
];

function containsSqlInjection(value) {
  if (typeof value !== 'string') return false;
  return SQL_INJECTION_PATTERNS.some(pattern => pattern.test(value));
}

function containsXss(value) {
  if (typeof value !== 'string') return false;
  return XSS_PATTERNS.some(pattern => pattern.test(value));
}

function isValidEmail(email) {
  if (!email) return true; // null es aceptable si el campo lo permite
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  if (!phone) return true;
  return /^[\d\s\-\+\(\)]{7,20}$/.test(phone);
}

function isValidPrice(price) {
  if (price === null || price === undefined) return true;
  return parseFloat(price) >= 0;
}

// Valida un registro completo y retorna si es seguro procesarlo
function validateRecord(tableName, record) {
  const vulnerabilities = [];

  for (const [field, value] of Object.entries(record)) {
    if (containsSqlInjection(value)) {
      vulnerabilities.push({
        field,
        type: 'SQL_INJECTION',
        value: String(value).substring(0, 50)
      });
    }

    if (containsXss(value)) {
      vulnerabilities.push({
        field,
        type: 'XSS',
        value: String(value).substring(0, 50)
      });
    }
  }

  // Validaciones específicas por tabla
  if (tableName === 'clientes' || tableName === 'usuarios') {
    if (!isValidEmail(record.Email)) {
      vulnerabilities.push({ field: 'Email', type: 'INVALID_FORMAT', value: record.Email });
    }
    if (!isValidPhone(record.Telefono)) {
      vulnerabilities.push({ field: 'Telefono', type: 'INVALID_FORMAT', value: record.Telefono });
    }
  }

  if (tableName === 'productos') {
    if (!isValidPrice(record.Precio)) {
      vulnerabilities.push({ field: 'Precio', type: 'INVALID_VALUE', value: record.Precio });
    }
  }

  return {
    isClean: vulnerabilities.length === 0,
    vulnerabilities
  };
}

module.exports = { validateRecord };