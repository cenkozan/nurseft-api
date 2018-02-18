"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const chaiHttp = require("chai-http");
process.env.NODE_ENV = 'test';
const app_1 = require("../app");
const cat_1 = require("../models/cat");
const should = chai.use(chaiHttp).should();
describe('Cats', () => {
    beforeEach(done => {
        cat_1.default.remove({}, err => {
            done();
        });
    });
    describe('Backend tests for cats', () => {
        it('should get all the cats', done => {
            chai.request(app_1.app)
                .get('/api/cats')
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
        it('should get cats count', done => {
            chai.request(app_1.app)
                .get('/api/cats/count')
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('number');
                res.body.should.be.eql(0);
                done();
            });
        });
        it('should create new cat', done => {
            const cat = { name: 'Fluffy', weight: 4, age: 2 };
            chai.request(app_1.app)
                .post('/api/cat')
                .send(cat)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.a.property('name');
                res.body.should.have.a.property('weight');
                res.body.should.have.a.property('age');
                done();
            });
        });
        it('should get a cat by its id', done => {
            const cat = new cat_1.default({ name: 'Cat', weight: 2, age: 4 });
            cat.save((error, newCat) => {
                chai.request(app_1.app)
                    .get(`/api/cat/${newCat.id}`)
                    .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('weight');
                    res.body.should.have.property('age');
                    res.body.should.have.property('_id').eql(newCat.id);
                    done();
                });
            });
        });
        it('should update a cat by its id', done => {
            const cat = new cat_1.default({ name: 'Cat', weight: 2, age: 4 });
            cat.save((error, newCat) => {
                chai.request(app_1.app)
                    .put(`/api/cat/${newCat.id}`)
                    .send({ weight: 5 })
                    .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
            });
        });
        it('should delete a cat by its id', done => {
            const cat = new cat_1.default({ name: 'Cat', weight: 2, age: 4 });
            cat.save((error, newCat) => {
                chai.request(app_1.app)
                    .delete(`/api/cat/${newCat.id}`)
                    .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=cats.spec.js.map