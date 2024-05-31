// write a nodejs server that will expose a method call "get" that will return the value of the key passed in the query string
// example: http://localhost:3000/get?key=hello
// if the key is not passed, return "key not passed"
// if the key is passed, return "hello" + key
// if the url has other methods, return "method not supported"
// when server is listening, log "server is listening on port 3000"

const express = require('express');
const app = express();
const port = 3000;

app.get('/get', (req, res) => {
    const key = req.query.key;
    if (!key) {
        res.send('key not passed');
    } else {
        res.send('hello ' + key);
    }
});

app.all('*', (req, res) => {
    res.send('method not supported');
});

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

