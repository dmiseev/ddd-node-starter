import 'mocha';

import chai = require('chai');
import chaiHttp = require('chai-http');
import { rollbackMigrations } from '../TestCase';

let should = chai.should();

chai.use(chaiHttp);

describe('Auth', () => {

    before((done) => {
        rollbackMigrations(done);
    });

    describe('/POST /auth/sign-up', () => {

        it('should register new user', (done) => {

            chai.request('http://localhost:3000')
                .post('/api/v1/auth/sign-up')
                .type('form')
                .send({
                    'email': 'test@test.com',
                    'password': 'testpass',
                    'firstName': 'Ivan',
                    'lastName': 'Ivanov'
                })
                .end((err, res) => {
                    res.should.have.status(201);

                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('email').eql('test@test.com');
                    res.body.should.have.property('firstName').eql('Ivan');
                    res.body.should.have.property('lastName').eql('Ivanov');
                    res.body.should.have.property('createdAt');
                    res.body.should.have.property('isActive').eql(false);

                    done();
                });
        });

        it('should return validation error while registration', (done) => {

            chai.request('http://localhost:3000')
                .post('/api/v1/auth/sign-up')
                .type('form')
                .send({
                    'email': 'test',
                    'password': 'testpass',
                    'firstName': 'Ivan',
                    'lastName': 'Ivanov'
                })
                .end((err, res) => {
                    res.should.have.status(422);

                    res.body.should.be.a('object');
                    res.body.should.have.property('errorMessage').eql('Validation error.');
                    res.body.should.have.property('error');

                    done();
                });
        });
    });

    describe('/POST /auth/sign-in', () => {

        it('should login user and return jwt token', (done) => {

            chai.request('http://localhost:3000')
                .post('/api/v1/auth/sign-up')
                .type('form')
                .send({
                    'email': 'alex.clare@test.com',
                    'password': 'testpass',
                    'firstName': 'Alex',
                    'lastName': 'Clare'
                })
                .then((res) => {

                    chai.request('http://localhost:3000')
                        .post('/api/v1/auth/sign-in')
                        .type('form')
                        .send({
                            'email': 'alex.clare@test.com',
                            'password': 'testpass'
                        })
                        .end((err, res) => {
                            res.should.have.status(200);

                            res.body.should.be.a('object');
                            res.body.should.have.property('token');

                            done();
                        });
                })
        });

        it('should return validation error while login', (done) => {

            chai.request('http://localhost:3000')
                .post('/api/v1/auth/sign-up')
                .type('form')
                .send({
                    'email': 'alex.clare@test.com'
                })
                .end((err, res) => {
                    res.should.have.status(422);

                    res.body.should.be.a('object');
                    res.body.should.have.property('errorMessage').eql('Validation error.');
                    res.body.should.have.property('error');

                    done();
                });
        });
    });
});