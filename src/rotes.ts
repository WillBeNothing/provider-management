import { Router } from 'express';

const routes = Router();

routes.get('/:message', (req, res) => {
    const {message} = req.params;

    return res.send(message);
})

export default routes;