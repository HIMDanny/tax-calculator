import type { RouteConfig, RouteHandler } from '@hono/zod-openapi';

import type { AppBindings } from './app-bindings';

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;
