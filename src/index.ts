import { serve } from 'bun';

import app from './app';
import env from './env';

const PORT = env.PORT;

// eslint-disable-next-line no-console
console.log(`Running on http://localhost:${PORT}`);

serve({
  fetch: app.fetch,
  port: PORT,
});
