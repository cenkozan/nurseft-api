import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Carer from '../models/carer';

const should = chai.use(chaiHttp).should();

describe('Carers', () => {

  beforeEach(done => {
    Carer.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for carers', () => {

    it('should get all the carers', done => {
      chai.request(app)
        .get('/api/carers')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get carer count', done => {
      chai.request(app)
        .get('/api/carers/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new carer', done => {
      const carer = new Carer ({firstName: 'Dave', lastName: 'Carer', phone: '5554444213', email: 'davecarer@hotmail.com',
         gender: 'Male', dob: '1960-02-13',
        addressLine1: '141 NorthWood Way', addressLine2: 'Northwood', city: 'London', postcode: 'HA6 1RF' });
      chai.request(app)
        .post('/api/carer')
        .send(carer)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('firstName');
          res.body.should.have.a.property('lastName');
          res.body.should.have.a.property('gender');
          // res.body.should.have.a.property('appointments');
          done();
        });
    });

    it('should create new carer', done => {
      const carer = new Carer ({firstName: 'John', lastName: 'Carer', phone: '5553338976', email: 'johncarer@gmail.com',
        gender: 'Male', dob: '1970-02-13',
        addressLine1: '140 NorthWood Way', addressLine2: 'Northwood', city: 'London', postcode: 'HA6 5RX' });
      chai.request(app)
        .post('/api/carer')
        .send(carer)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('firstName');
          res.body.should.have.a.property('lastName');
          res.body.should.have.a.property('gender');
          // res.body.should.have.a.property('appointments');
          done();
        });
    });

    it('should create new carer', done => {
      const carer = new Carer ({firstName: 'Jane', lastName: 'Carer', phone: '5555691234', email: 'janecarer@hotmail.com',
        gender: 'Female', dob: '1968-02-13',
        addressLine1: 'YMCA', addressLine2: 'Hollywood', city: 'London', postcode: 'N2 1RT' });
      chai.request(app)
        .post('/api/carer')
        .send(carer)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('firstName');
          res.body.should.have.a.property('lastName');
          res.body.should.have.a.property('gender');
          // res.body.should.have.a.property('appointments');
          done();
        });
    });

    it('should get a carer by its id', done => {
      const carer = new Carer ({firstName: 'Dave', lastName: 'David', gender: 'M', dob: '1949-06-13',
        email: 'cokahraman@hotmail.com', phone: '7777777777', addressLine1: '141 NorthWood Way, London, HA6 1RF' });
      carer.save((error, newCarer) => {
        chai.request(app)
          .get(`/api/carer/${newCarer.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('email');
            res.body.should.have.property('_id').eql(newCarer.id);
            done();
          });
      });
    });

    it('should update a carer by its id', done => {
      const carer = new Carer({names: 'Dave', surname: 'David', gender: 'M', dob: '14 June 1949',
        email: 'cokahraman@hotmail.com', addressLine1: '141 NorthWood Way, London, HA6 1RF' });
      carer.save((error, newCarer) => {
        chai.request(app)
          .put(`/api/carer/${newCarer.id}`)
          .send({ userName: 'User 2' })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a carer by its id', done => {
      const carer = new Carer({ email: 'user@example.com' });
      carer.save((error, newCarer) => {
        chai.request(app)
          .delete(`/api/carer/${newCarer.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

  });

});


