const express = require('express');
const bodyParser = require('body-parser');
const jsonrpc = require('jsonrpc-lite');

const app = express();
app.use(bodyParser.json());

app.post('/api', (req, res) => {
  // Parseamos la petición JSON-RPC
  const parsed = jsonrpc.parseObject(req.body);

  if (parsed.type === 'request') {
    const { id, method, params } = parsed.payload;

    if (method === 'sumar') {
      // Suponemos que params es un array con dos números
      const [a, b] = params;
      const result = a + b;

      // Respuesta JSON-RPC
      const response = jsonrpc.success(id, result);
      res.json(response);
    } else {
      // Método no encontrado
      const response = jsonrpc.error(id, new jsonrpc.JsonRpcError('Method not found', -32601));
      res.json(response);
    }
  } else {
    // Petición inválida
    res.status(400).send('Invalid JSON-RPC request');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`JSON-RPC server running at http://localhost:${PORT}/api`);
});
