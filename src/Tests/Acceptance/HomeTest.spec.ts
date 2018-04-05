import 'mocha';

import chai = require('chai');
import chaiHttp = require('chai-http');
import { environment } from '../TestCase';

chai.use(chaiHttp);

describe('Home', () => {

    describe('/GET /', () => {

        it('should return message', (done) => {

            chai.request(environment.baseUrl + environment.apiVersion)
                .get('')
                .end((err, res) => {
                    chai.assert.equal(res.status, 200);
                    chai.assert.deepEqual(res.body, {message: 'Home page.'});
                    done();
                });
        });
    });
});