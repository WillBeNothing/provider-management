import express from 'express';

import routes from './rotes'

const app = express();
const PORT : string|number = process.env.PORT || 5000;

app.use(routes);
app.use(express.json());

app.listen(PORT,() => console.log(`hosting @${PORT}`));