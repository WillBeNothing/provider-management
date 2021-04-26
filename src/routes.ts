import { Router } from 'express';
import multer from 'multer';

import GroupController from './app/controllers/group-controller';
import ProvidersController from './app/controllers/providers-controllers';
import ProductsController from './app/controllers/products-controller';
import UsersControllers from './app/controllers/user-controllers';
import ConfigUpload from './config/upload';

import auth from './app/middlewares/auth';

const routes = Router();
const upload = multer(ConfigUpload);

const Providers = new ProvidersController();
const Group = new GroupController();
const Products = new ProductsController();
const Users = new UsersControllers();

routes.get('/providers', auth, Providers.index);
routes.get('/groups/:id', auth, Group.show);
routes.get('/groups', auth, Group.index);
routes.get('/products/:id', auth, Products.show);
routes.get('/products', auth, Products.index);

routes.post('/providers', auth, Providers.create);
routes.post('/groups', auth, Group.create);
routes.post('/products', auth, upload.single('image'), Products.create);
routes.post('/register', Users.store);
routes.post('/login', Users.session);

routes.put('/products/:id', upload.single('image'), auth, Products.update);
routes.put('/providers/:id', auth, Providers.update);

export default routes;
