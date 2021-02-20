import { Router } from 'express';
import ProvidersController from './app/controllers/providers-controllers'

const routes = Router();

const Providers = new ProvidersController();

routes.post('/providers', Providers.create)


export default routes;