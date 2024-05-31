const url = require('url');

function parseUrl(someurl) {
    const parsedUrl = url.parse(someurl, true);

    return {
        protocol: parsedUrl.protocol,
        host: parsedUrl.hostname,
        port: parsedUrl.port,
        path: parsedUrl.pathname,
        query: parsedUrl.query,
        hash: parsedUrl.hash
    };
}

module.exports = parseUrl;