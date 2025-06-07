const fetch = require('node-fetch');

async function llamarSumar(a, b) {
  const body = {
    jsonrpc: "2.0",
    method: "sumar",
    params: [a, b],
    id: 1
  };

  const response = await fetch('http://localhost:3000/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  console.log('Respuesta del servidor:', data);
}

llamarSumar(5, 7);
