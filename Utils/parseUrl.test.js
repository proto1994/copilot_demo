const assert = require('assert');
const parseUrl = require('./parseUrl');

describe('parseUrl', function() {
    it('should correctly parse the protocol', function() {
        const result = parseUrl('http://example.com');
        assert.strictEqual(result.protocol, 'http:');
    });

    it('should correctly parse the host', function() {
        const result = parseUrl('http://example.com');
        assert.strictEqual(result.host, 'example.com');
    });

    it('should correctly parse the port', function() {
        const result = parseUrl('http://example.com:8080');
        assert.strictEqual(result.port, '8080');
    });

    it('should correctly parse the path', function() {
        const result = parseUrl('http://example.com/test/path');
        assert.strictEqual(result.path, '/test/path');
    });

    it('should correctly parse the hash', function() {
        const result = parseUrl('http://example.com#hash');
        assert.strictEqual(result.hash, '#hash');
    });
});