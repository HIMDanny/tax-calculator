import { createRoute } from '@hono/zod-openapi';

import { createRouter } from '~/lib/create-app';
import { HttpStatusCode } from '~/lib/enums/http-status-code';
import { jsonContent } from '~/lib/helpers/json-content';
import { createMessageObjectSchema } from '~/lib/helpers/schemas/create-message-object';

const router = createRouter().openapi(
  createRoute({
    tags: ['Index'],
    method: 'get',
    path: '/',
    responses: {
      [HttpStatusCode.OK]: jsonContent('Tax Calculator API Index', createMessageObjectSchema('Tax Calculator API')),
    },
  }),
  (c) => {
    return c.json({ message: 'Tax Calculator API Index' }, HttpStatusCode.OK);
  },
);

export default router;
