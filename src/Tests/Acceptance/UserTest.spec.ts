import 'mocha';

import chai = require('chai');
import chaiHttp = require('chai-http');
import { environment, rollbackMigrations } from '../TestCase';

let should = chai.should();

chai.use(chaiHttp);

describe('User', () => {

    before((done) => {
        rollbackMigrations(done);
    });

    describe('/Get /users', () => {

        it('try to get users without x-access-token', (done) => {

            chai.request(environment.baseUrl + environment.apiVersion)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('errorMessage').eql('not authorized');
                    done();
                });
        });

        it('try to get users with wrong x-access-token', (done) => {

            chai.request(environment.baseUrl + environment.apiVersion)
                .get('/users')
                .set('x-access-token', 'dawda2dasf12rsdf.dawda2dasf12rsdf.dawda2dasf12rsdf')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('errorMessage').eql('not authorized');
                    done();
                });
        });

        it('should return all users', (done) => {

            chai.request(environment.baseUrl + environment.apiVersion)
                .post('/auth/sign-in').type('form').send({
                'email': environment.email,
                'password': environment.password
            }).then((res) => {
                chai.request(environment.baseUrl + environment.apiVersion)
                    .get('/users')
                    .set('x-access-token', res.body.token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.have.header('x-items-count', '2');
                        done();
                    });
            });
        });
    });
});