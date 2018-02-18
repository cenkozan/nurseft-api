"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
process.env.NODE_ENV = 'test';
const app_1 = require("../app");
const client_1 = require("../models/client");
const should = chai.use(chaiHttp).should();
describe('Clients', () => {
    beforeEach(done => {
        client_1.default.remove({}, err => {
            done();
        });
    });
    describe('Backend tests for clients', () => {
        it('should get all the clients', done => {
            chai.request(app_1.app)
                .get('/api/clients')
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
        it('should get client count', done => {
            chai.request(app_1.app)
                .get('/api/clients/count')
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('number');
                res.body.should.be.eql(0);
                done();
            });
        });
        it('should create new client', done => {
            const client = { names: 'Dave', surname: 'David', gender: 'M', dob: '14 June 1949',
                weight: 56, address: '141 NorthWood Way, London, HA6 1RF', userName: 'davedavid',
                conditions: 'Eye Sight Problem', additionalServices: 'In need of carrying',
                contacts: [{ name: 'Dave Chapel', phone: '5555554445454', address: '' }],
                medicines: [{ name: 'Prozac', dose: 'Every 8 hours after meal' }] };
            chai.request(app_1.app)
                .post('/api/client')
                .send(client)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.a.property('names');
                res.body.should.have.a.property('surname');
                res.body.should.have.a.property('gender');
                done();
            });
        });
        it('should get a user by its id', done => {
            const client = new client_1.default({ names: 'Dave', surname: 'David', gender: 'M', dob: '14 June 1949',
                weight: 56, email: 'cokahraman@hotmail.com', address: '141 NorthWood Way, London, HA6 1RF', userName: 'davedavid',
                conditions: 'Eye Sight Problem', additionalServices: 'In need of carrying',
                contacts: [{ name: 'Dave Chapel', phone: '5555554445454', address: '' }],
                medicines: [{ name: 'Prozac', dose: 'Every 8 hours after meal' }] });
            client.save((error, newClient) => {
                chai.request(app_1.app)
                    .get(`/api/client/${newClient.id}`)
                    .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('userName');
                    res.body.should.have.property('email');
                    res.body.should.have.property('address');
                    res.body.should.have.property('_id').eql(newClient.id);
                    done();
                });
            });
        });
        it('should update a user by its id', done => {
            const client = new client_1.default({ names: 'Dave', surname: 'David', gender: 'M', dob: '14 June 1949',
                weight: 56, email: 'cokahraman@hotmail.com', address: '141 NorthWood Way, London, HA6 1RF', userName: 'davedavid',
                conditions: 'Eye Sight Problem', additionalServices: 'In need of carrying',
                contacts: [{ name: 'Dave Chapel', phone: '5555554445454', address: '' }],
                medicines: [{ name: 'Prozac', dose: 'Every 8 hours after meal' }] });
            client.save((error, newClient) => {
                chai.request(app_1.app)
                    .put(`/api/client/${newClient.id}`)
                    .send({ username: 'User 2' })
                    .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
            });
        });
        it('should add users temperature', done => {
            const client = new client_1.default({ names: 'Dave', surname: 'David', gender: 'M', dob: '14 June 1949',
                email: 'cokahraman@hotmail.com', address: '141 NorthWood Way, London, HA6 1RF', userName: 'davedavid' });
            client.save((error, newClient) => {
                chai.request(app_1.app)
                    .put(`/api/client/${newClient.id}`)
                    .send({ temperatures: [{ date: new Date(), weight: 50 }] })
                    .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
            });
        });
        it('should delete a user by its id', done => {
            const client = new client_1.default({ userName: 'User', email: 'user@example.com' });
            client.save((error, newClient) => {
                chai.request(app_1.app)
                    .delete(`/api/client/${newClient.id}`)
                    .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=client.spec.js.map