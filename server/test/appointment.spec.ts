import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Appointment from '../models/appointment';

const should = chai.use(chaiHttp).should();

describe('Appointments', () => {

  beforeEach(done => {
    Appointment.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for appointments', () => {

    it('should get all the appointments', done => {
      chai.request(app)
        .get('/api/appointments')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get appointment count', done => {
      chai.request(app)
        .get('/api/appointments/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new appointment', done => {
      const appointment = new Appointment ({ title: 'joe', start: new Date(), end: new Date(), dow: 'joe', client: 'joe', carer: 'joe'});
      chai.request(app)
        .post('/api/appointment')
        .send(appointment)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('title');
          res.body.should.have.a.property('start');
          res.body.should.have.a.property('end');
          res.body.should.have.a.property('dow');
          done();
        });
    });

    it('should get a appointment by its id', done => {
      const appointment = new Appointment ({ title: 'joe' });
      appointment.save((error, newAppointment) => {
        chai.request(app)
          .get(`/api/appointment/${newAppointment.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            res.body.should.have.property('_id').eql(newAppointment.id);
            done();
          });
      });
    });

    it('should update a appointment by its id', done => {
      const appointment = new Appointment({ title: 'joe' });
      appointment.save((error, newAppointment) => {
        chai.request(app)
          .put(`/api/appointment/${newAppointment.id}`)
          .send({ start: new Date() })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a appointment by its id', done => {
      const appointment = new Appointment({ title: 'joe' });
      appointment.save((error, newAppointment) => {
        chai.request(app)
          .delete(`/api/appointment/${newAppointment.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should return appointments by carers', done => {
      const appointment1 = new Appointment({ title: 'joe', carer: 'joe' });
      const appointment2 = new Appointment({ title: 'joe2', carer: 'joe' });
      appointment1.save((error, newAppointment1) => {
        appointment2.save((error2, newAppointment2) => {
          chai.request(app)
            .get(`/api/appointment/carer/${ newAppointment2.carer }`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(2);
              done();
            });
        });
      });
    });

  });

});
