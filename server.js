const express = require('express');
const app = new express();

app.get('/', (req, res) => {
    res.send("<h1>Adiós mundo, sale sopes en vacas D':</h1>");
});

app.listen(process.env.port || 8080);
