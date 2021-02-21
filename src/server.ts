import express from 'express';

import routes from './rotes';

import './database/connection';

const app = express();
const PORT : string|number = process.env.PORT || 5000;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`hosting @${PORT}`));
