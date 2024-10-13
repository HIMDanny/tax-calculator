import type { ErrorHandler } from 'hono';
import type { StatusCode } from 'hono/utils/http-status';

import { HttpStatusCode } from '~/lib/enums/http-status-code';
import env from '~/env';

export const onError: ErrorHandler = (err, c) => {
  const currentStatus = 'status' in err ? err.status : c.newResponse(null).status;
  const statusCode = currentStatus !== HttpStatusCode.OK ? currentStatus as StatusCode : HttpStatusCode.InternalServerError;

  const environment = c.env?.NODE_ENV ?? env.NODE_ENV;

  return c.json({
    message: err.message,
    stack: environment === 'production' ? undefined : err.stack,
  }, statusCode);
};
