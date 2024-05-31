// write a nodejs server that will expose a method call "get" that will return the value of the key passed in the query string
// example: http://localhost:3000/get?key=hello
// if the key is not passed, return "key not passed"
// if the key is passed, return "hello" + key
// if the url has other methods, return "method not supported"
// when server is listening, log "server is listening on port 3000"

const fs = require('fs');
const archiver = require('archiver');
const zlib = require('zlib');
const express = require('express');
const axios = require('axios');
const readline = require('readline');
const app = express();
const parseUrl = require('./Utils/parseUrl');
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

app.get('/parseUrl', (req, res) => {
    const parsedUrl = parseUrl(req.query.url);
    res.send(parsedUrl);   
})

// `/CalculateMemoryConsumption`:
app.get('/CalculateMemoryConsumption', (req, res) => {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    res.send(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
});


/**
 * - `/ReturnColorCode`:
    - 通过查询字符串接收名为 `color` 的参数
    - 读取 `colors.json` 文件并返回 `rgba` 字段
    - 从查询字符串获取 `color` 变量
    - 遍历 `colors.json` 中的每种颜色以找到该颜色
    - 返回 `code.hex` 字段
 */

app.get('/ReturnColorCode', (req, res) => {
    const color = req.query.color;
    fs.readFile('colors.json', 'utf8', (err, data) => {
        if (err) {
            res.send('Error reading file');
        } else {
            const colors = JSON.parse(data);
            for (const c of colors) {
                if (c.color === color) {
                    res.send(c.code.hex);
                    return;
                }
            }
            res.send('Color not found');
        }
    });
})

/**
 * - `/ValidateSpanishDNI`:
    - 通过查询字符串接收名为 `dni` 的参数
    - 计算 DNI 字母
    - 如果 DNI 有效则返回 "valid"，如果无效则返回 "invalid"
 */

app.get('/ValidateSpanishDNI', (req, res) => {
    const dni = req.query.dni;
    const letter = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const regex = /^[0-9]{8}[A-Z]$/;
    if (regex.test(dni)) {
        const number = dni.substring(0, 8);
        const mod = number % 23;
        if (letter.charAt(mod) === dni.charAt(8)) {
            res.send('valid');
        } else {
            res.send('invalid');
        }
    } else {
        res.send('invalid');
    }
})

const countries = [
    { name: 'Spain', iso: 'ES' },
    { name: 'France', iso: 'FR' },
    // Add more European countries here
];

app.get('/RandomEuropeanCountry', (req, res) => {
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    res.json(randomCountry);
});

app.get('/MakeZipFile', (req, res) => {
    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });

    const output = fs.createWriteStream('sample.zip');

    output.on('close', () => {
        res.send('File zipped successfully!');
    });

    archive.pipe(output);
    archive.file('sample.txt', { name: 'sample.txt' });
    archive.finalize();
});

app.get('/GetLineByLineFromTextFile', (req, res) => {
    const fileStream = fs.createReadStream('sample.txt');
    const lines = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let result = [];
    lines.on('line', (line) => {
        if (line.includes('Fusce')) {
            result.push(line);
        }
    });

    lines.on('close', () => {
        res.send(result);
    });
});

app.get('/GetFullTextFile', (req, res) => {
    fs.readFile('sample.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
            return;
        }

        const lines = data.split('\n');
        const result = lines.filter(line => line.includes('Fusce'));
        res.send(result);
    });
});

app.all('*', (req, res) => {
    res.send('method not supported');
});

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

