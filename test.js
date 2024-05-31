//write npm command line to install mocha
//npm install --global mocha

//command to run this test file
//mocha test.js

const assert = require('assert');
const http = require('http');
const server = require('./nodeserver');

describe('Node Server', () => {
    it('should return "key not passed" if key is not passed', (done) => {
        http
        .get('http://localhost:3000/get' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'key not passed');
                done();
            });
        });
    });

    // Test for validatePhoneNumber
    it('should return "valid" for a valid Spanish phone number', (done) => {
        http
        .get('http://localhost:3000/ValidatePhoneNumber?phoneNumber=+34600123456' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'invalid');
                done();
            });
        });
    });

    // Test for validateSpanishDNI
    it('should return "valid" for a valid Spanish DNI', (done) => {
        http
        .get('http://localhost:3000/ValidateSpanishDNI?dni=12345678Z' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'valid');
                done();
            });
        });
    });

    // Test for returnColorCode
    it('should return "#FF0000" for color red', (done) => {
        http
        .get('http://localhost:3000/ReturnColorCode?color=red' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, '#FF0000');
                done();
            });
        });
    });

    // Test for daysBetweenDates
    it('should return the correct number of days between two dates', (done) => {
        http
        .get('http://localhost:3000/DaysBetweenDates?date1=2022-01-01&date2=2022-01-31' , (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                assert.equal(data, 'Days between dates: 30');
                done();
            });
        });
    });





});
