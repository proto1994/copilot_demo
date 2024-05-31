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

// `/DaysBetweenDates`:
app.get('/DaysBetweenDates', (req, res) => {
    const date1 = new Date(req.query.date1);
    const date2 = new Date(req.query.date2);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    res.send('Days between dates: ' + diffDays);
});

// `/ValidatePhoneNumber`:
app.get('/ValidatePhoneNumber', (req, res) => {
    const phoneNumber = req.query.phoneNumber;
    const regex = /^\+34[6-9][0-9]{8}$/;
    if (regex.test(phoneNumber)) {
        res.send('valid');
    } else {
        res.send('invalid');
    }
});

// `/TellMeAJoke`:
app.get('/TellMeAJoke', async (req, res) => {
    // You need to find a joke API and replace the URL below
    const response = await axios.get('https://api.jokeapi.dev/joke');
    res.send(response.data.joke);
});

// `/MoviesByDirector`:
app.get('/MoviesByDirector', async (req, res) => {
    // You need to find a movie API and replace the URL below
    const response = await axios.get('https://api.movieapi.dev/director/' + req.query.director);
    res.send(response.data.movies);
});

app.get('/ListFiles', (req, res) => {
    fs.readdir('.', (err, files) => {
        if (err) {
            res.send('Error reading files');
        } else {
            res.send(files);
        }
    });
});

// `/CalculateMemoryConsumption`:
app.get('/CalculateMemoryConsumption', (req, res) => {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    res.send(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
});

app.all('*', (req, res) => {
    res.send('method not supported');
});

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

