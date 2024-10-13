import type { Hook } from '@hono/zod-openapi';

import { HttpStatusCode } from '~/lib/enums/http-status-code';

export const defaultHook: Hook<any, any, any, any> = async (result, c) => {
  if (!result.success) {
    return c.json({
      success: result.success,
      error: result.error,
    }, HttpStatusCode.UnprocessableEntity);
  }
};
