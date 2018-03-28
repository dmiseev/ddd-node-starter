import 'mocha';

import chai = require('chai');
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Home', () => {

    describe('/GET /api/v1', () => {

        it('should return message', (done) => {

            chai.request('http://localhost:3000')
                .get('/api/v1')
                .end((err, res) => {
                    chai.assert.equal(res.status, 200);
                    chai.assert.deepEqual(res.body, { message: 'Home page.' });
                    done();
                });
        });
    });
});