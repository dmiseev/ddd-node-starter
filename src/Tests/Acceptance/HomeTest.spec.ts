import 'mocha';

import chai = require('chai');
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('HomeController', () => {

    beforeEach(() => {
        chai.request('http://localhost:3000')
            .del('/api/v1/fixtures')
            .end((err, res) => {
                console.log(res.body);
            });
    });

    it('GET /api/v1', (done) => {

        chai.request('http://localhost:3000')
            .get('/api/v1')
            .end((err, res) => {
                chai.assert.equal(res.status, 200);
                chai.assert.deepEqual(res.body, { message: 'Home page.' });
                done();
            });
    });

    it('GET /api/v1', (done) => {

        chai.request('http://localhost:3000')
            .get('/api/v1')
            .end((err, res) => {
                chai.assert.equal(res.status, 200);
                chai.assert.deepEqual(res.body, { message: 'Home page.' });
                done();
            });
    });
});