import type { OpenAPIHono } from '@hono/zod-openapi';

import type { AppBindings } from './app-bindings';

export type AppOpenAPI = OpenAPIHono<AppBindings>;
