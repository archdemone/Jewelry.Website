import pino from 'pino';

// Singleton logger
let loggerInstance: pino.Logger | null = null;

export function getLogger(): pino.Logger {
  if (!loggerInstance) {
    loggerInstance = pino({
      level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
      base: undefined,
    });
  }
  return loggerInstance;
}

export function getRequestIdFromHeaders(headers: Headers): string | undefined {
  return headers.get('x-request-id') || undefined;
}

export function withRequest(
  logger: pino.Logger,
  headers: Headers,
  extra?: Record<string, unknown>,
): pino.Logger {
  const reqId = getRequestIdFromHeaders(headers);
  return logger.child({ reqId, ...extra });
}
