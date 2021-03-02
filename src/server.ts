import express from 'express';
import { resolve } from 'path'

import routes from './routes';

import './database/connection';

const app = express();
const PORT : string|number = process.env.PORT || 5000;

app.use(express.json());
app.use('/images', express.static(resolve(__dirname, 'tmp', 'uploads')))
app.use(routes);

app.listen(PORT, () => console.log(`hosting @${PORT}`));
