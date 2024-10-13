import index from '~/routes/index.route';
import taxes from '~/routes/taxes/taxes.index';

import { configureOpenAPI } from './lib/configure-open-api';
import { createApp } from './lib/create-app';

const app = createApp();

const routes = [
  index,
  taxes,
];

configureOpenAPI(app);

routes.forEach((route) => {
  app.route('/api', route);
});

export default app;
