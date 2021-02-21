import { Router } from 'express';

import GroupController from './app/controllers/group-controller';
import ProvidersController from './app/controllers/providers-controllers';
import ProductsController from './app/controllers/products-controller';

const routes = Router();

const Providers = new ProvidersController();
const Group = new GroupController();
const Products = new ProductsController();

routes.get('/providers', Providers.index);
routes.get('/groups/:id', Group.show);
routes.get('/groups', Group.index);

routes.post('/providers', Providers.create);
routes.post('/groups', Group.create);
routes.post('/products', Products.create);

export default routes;
