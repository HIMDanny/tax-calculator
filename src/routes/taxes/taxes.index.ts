import { createRouter } from '~/lib/create-app';

import * as handlers from './taxes.handlers';
import * as routes from './taxes.routes';

const router = createRouter().openapi(
  routes.taxRates,
  handlers.taxRates,
).openapi(
  routes.calculateTax,
  handlers.calculateTax,
);

export default router;
