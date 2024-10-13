import type { NotFoundHandler } from 'hono';

import { HttpStatusCode } from '~/lib/enums/http-status-code';
import { HttpStatusPhrase } from '~/lib/enums/http-status-phrase';

export const notFound: NotFoundHandler = (c) => {
  return c.json(
    {
      message: `${HttpStatusPhrase.NOT_FOUND} - ${c.req.path}`,
    },
    HttpStatusCode.NotFound,
  );
};
