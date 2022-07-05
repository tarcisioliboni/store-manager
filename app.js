const express = require('express');
const rescue = require('express-rescue');
const routerProduct = require('./routes/productRoute');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use('/products', rescue(routerProduct));
app.use(errorMiddleware);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;