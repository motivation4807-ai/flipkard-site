import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: ['req.headers.authorization', 'DATABASE_URL', 'REDIS_URL'],
  base: { service: 'catalog-api' },
  timestamp: pino.stdTimeFunctions.isoTime
});
