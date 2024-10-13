import { apiReference } from '@scalar/hono-api-reference';

import type { AppOpenAPI } from '~/lib/types/app-open-api';

import packageConfig from '../../package.json' with { tpe: 'json' };

export function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: packageConfig.version,
      title: 'Tax Calculator API',
    },
  });

  app.get(
    '/reference',
    apiReference({
      theme: 'deepSpace',
      defaultHttpClient: {
        targetKey: 'javascript',
        clientKey: 'fetch',
      },
      spec: {
        url: '/doc',
      },
    }),
  );
}
