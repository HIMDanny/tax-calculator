import { OpenAPIHono } from '@hono/zod-openapi';

import type { AppBindings } from '~/lib/types/app-bindings';

import { notFound } from '~/lib/middlewares/not-found';
import { onError } from '~/lib/middlewares/on-error';
import { pinoLogger } from '~/lib/middlewares/pino-logger';
import serveEmojiFavicon from '~/lib/middlewares/serve-emoji-favicon';

import { defaultHook } from './default-hook';

export function createRouter() {
  return new OpenAPIHono<AppBindings>({ strict: false, defaultHook });
}

export function createApp() {
  const app = createRouter();

  app.use(pinoLogger());
  app.use(serveEmojiFavicon('👋'));

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
