import express from 'express';

import routes from './rotes'

const app = express();

app.use(routes);
app.use(express.json());

app.listen(3000);