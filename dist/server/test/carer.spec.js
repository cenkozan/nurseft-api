"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
process.env.NODE_ENV = 'test';
const app_1 = require("../app");
const carer_1 = require("../models/carer");
const should = chai.use(chaiHttp).should();
describe('Carers', () => {
    beforeEach(done => {
        carer_1.default.remove({}, err => {
            done();
        });
    });
    describe('Backend tests for carers', () => {
        it('should get all the carers', done => {
            chai.request(app_1.app)
                .get('/api/carers')
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
        it('should get carer count', done => {
            chai.request(app_1.app)
                .get('/api/carers/count')
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('number');
                res.body.should.be.eql(0);
                done();
            });
        });
        it('should create new carer', done => {
            const carer = new carer_1.default({ names: 'Dave', surname: 'David', gender: 'M', dob: '14 June 1949',
                email: 'cokahraman@hotmail.com', appointments: [{ title: 'x', start: 'deneme', end: 'deneme', dow: 'deneme' }],
                phoneNumber: '7777777777',
                address: '141 NorthWood Way, London, HA6 1RF', userName: 'davedavid' });
            chai.request(app_1.app)
                .post('/api/carer')
                .send(carer)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.a.property('names');
                res.body.should.have.a.property('surname');
                res.body.should.have.a.property('gender');
                // res.body.should.have.a.property('appointments');
                done();
            });
        });
        it('should create new carer', done => {
            const client = {
                firstName: 'Dave',
                lastName: 'Davidson',
                gender: 'Male',
                dob: '1968-07-22',
                addressLine1: 'Westminster',
                addressLine2: '',
                city: 'London',
                postcode: 'SW1A 1AA',
                additionalInformation: 'Napoleon Complex',
                bloodPressures: [{ date: '2018-02-01', systolic: '120', diastolic: '80' }, { date: '2018-02-02', systolic: '121', diastolic: '81' }, { date: '2018-02-03', systolic: '120', diastolic: '80' }],
                weights: [{ date: '2018-02-01', weight: '80' }, { date: '2018-02-02', weight: '80' }, { date: '2018-02-03', weight: '80' }],
                temperatures: [{ date: '2018-02-01', temperature: '37' }, { date: '2018-02-02', temperature: '37' }, { date: '2018-02-03', temperature: '37' }],
            };
            chai.request(app_1.app)
                .post('/api/client')
                .send(client)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.a.property('_id');
                res.body.should.have.a.property('firstName');
                res.body.should.have.a.property('lastName');
                res.body.should.have.a.property('gender');
                done();
            });
        });
        it('should create new client', done => {
            const client = {
                firstName: 'David',
                lastName: 'Davidson Jr',
                gender: 'Male',
                dob: '1945-11-11',
                addressLine1: 'SW1A 1AA',
                city: 'London',
                postcode: 'SW1A 1AA',
                additionalInformation: 'A prozac every 8 hours after meal',
                bloodPressures: [{ date: '2018-02-01', systolic: '120', diastolic: '80' }, { date: '2018-02-02', systolic: '121', diastolic: '81' }, { date: '2018-02-03', systolic: '120', diastolic: '80' }],
                weights: [{ date: '2018-02-01', weight: '80' }, { date: '2018-02-02', weight: '80' }, { date: '2018-02-03', weight: '80' }],
                temperatures: [{ date: '2018-02-01', temperature: '37' }, { date: '2018-02-02', temperature: '37' }, { date: '2018-02-03', temperature: '37' }],
            };
            chai.request(app_1.app)
                .post('/api/client')
                .send(client)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.a.property('_id');
                res.body.should.have.a.property('firstName');
                res.body.should.have.a.property('lastName');
                res.body.should.have.a.property('gender');
                done();
            });
        });
        // it('should get a carer by its id', done => {
        //   const carer = new Carer ({names: 'Dave', surname: 'David', gender: 'M', dob: '14 June 1949',
        //     email: 'cokahraman@hotmail.com', phoneNumber: '7777777777', address: '141 NorthWood Way, London, HA6 1RF', userName: 'davedavid' });
        //   carer.save((error, newCarer) => {
        //     chai.request(app)
        //       .get(`/api/carer/${newCarer.id}`)
        //       .end((err, res) => {
        //         res.should.have.status(200);
        //         res.body.should.be.a('object');
        //         res.body.should.have.property('userName');
        //         res.body.should.have.property('email');
        //         res.body.should.have.property('_id').eql(newCarer.id);
        //         done();
        //       });
        //   });
        // });
        //
        // it('should update a carer by its id', done => {
        //   const carer = new Carer({names: 'Dave', surname: 'David', gender: 'M', dob: '14 June 1949',
        //     weight: 56, email: 'cokahraman@hotmail.com', address: '141 NorthWood Way, London, HA6 1RF', userName: 'davedavid' });
        //   carer.save((error, newCarer) => {
        //     chai.request(app)
        //       .put(`/api/carer/${newCarer.id}`)
        //       .send({ userName: 'User 2' })
        //       .end((err, res) => {
        //         res.should.have.status(200);
        //         done();
        //       });
        //   });
        // });
        //
        // it('should delete a carer by its id', done => {
        //   const carer = new Carer({ userName: 'User', email: 'user@example.com' });
        //   carer.save((error, newCarer) => {
        //     chai.request(app)
        //       .delete(`/api/carer/${newCarer.id}`)
        //       .end((err, res) => {
        //         res.should.have.status(200);
        //         done();
        //       });
        //   });
        // });
    });
});
//# sourceMappingURL=carer.spec.js.map