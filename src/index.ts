import { serve } from 'bun';

import app from './app';
import env from './env';

const PORT = env.PORT;

// eslint-disable-next-line no-console
console.log(`Running on http://localhost:${PORT}/api`);

// eslint-disable-next-line no-console
console.log(`Documentation: http://localhost:${PORT}/doc`);

// eslint-disable-next-line no-console
console.log(`Documentation: http://localhost:${PORT}/reference`);

serve({
  fetch: app.fetch,
  port: PORT,
});
