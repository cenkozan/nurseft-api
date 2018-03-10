import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Client from '../models/client';

const should = chai.use(chaiHttp).should();

describe('Clients', () => {

  // beforeEach(done => {
  //   Client.remove({}, err => {
  //     done();
  //   });
  // });

  describe('Backend tests for clients', () => {

    it('should get all the clients', done => {
      chai.request(app)
        .get('/api/clients')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get client count', done => {
      chai.request(app)
        .get('/api/clients/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    // it('should create new client', done => {
    //   const client = {
    //     firstName: 'Dave',
    //     lastName: 'Davidson',
    //     gender: 'Male',
    //     phone: '5557778934',
    //     dob: '1968-07-22',
    //     addressLine1: 'Westminster',
    //     addressLine2: '',
    //     city: 'London',
    //     postcode: 'SW1A 1AA',
    //     additionalInformation: 'Wears eye glasses. Needs eye drops every 3 hours',
    //     bloodPressures: [{date: '2018-02-01', systolic: '120', diastolic: '80'}, {date: '2018-02-02', systolic: '121', diastolic: '81'}, {date: '2018-02-03', systolic: '120', diastolic: '80'}],
    //     weights: [{date: '2018-02-01', weight: '80', metrics: 'kg'}, {date: '2018-02-02', weight: '160', metrics: 'lbs'}, {date: '2018-02-03', weight: '80', metrics: 'kg'}],
    //     temperatures: [{date: '2018-02-01', temperature: '37'}, {date: '2018-02-02', temperature: '37'}, {date: '2018-02-03', temperature: '37'}],
    //   };
    //   chai.request(app)
    //     .post('/api/client')
    //     .send(client)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a('object');
    //       res.body.should.have.a.property('_id');
    //       res.body.should.have.a.property('firstName');
    //       res.body.should.have.a.property('lastName');
    //       res.body.should.have.a.property('gender');
    //       done();
    //     });
    // });

    // it('should create new client', done => {
    //   const client = {
    //     firstName: 'Shannera',
    //     lastName: 'Jollywood',
    //     gender: 'Female',
    //     phone: '5557775612',
    //     dob: '1976-07-22',
    //     addressLine1: 'Westminster',
    //     addressLine2: '',
    //     city: 'London',
    //     postcode: 'N1 2BZ',
    //     additionalInformation: 'Needs help walking',
    //     bloodPressures: [{date: '2018-02-01', systolic: '120', diastolic: '80'}, {date: '2018-02-02', systolic: '121', diastolic: '81'}, {date: '2018-02-03', systolic: '120', diastolic: '80'}],
    //     weights: [{date: '2018-02-01', weight: '80', metrics: 'kg'}, {date: '2018-02-02', weight: '160', metrics: 'lbs'}, {date: '2018-02-03', weight: '80', metrics: 'kg'}],
    //     temperatures: [{date: '2018-02-01', temperature: '37'}, {date: '2018-02-02', temperature: '37'}, {date: '2018-02-03', temperature: '37'}],
    //   };
    //   chai.request(app)
    //     .post('/api/client')
    //     .send(client)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a('object');
    //       res.body.should.have.a.property('_id');
    //       res.body.should.have.a.property('firstName');
    //       res.body.should.have.a.property('lastName');
    //       res.body.should.have.a.property('gender');
    //       done();
    //     });
    // });
    //
    // it('should create new client', done => {
    //   const client = {
    //     firstName: 'Johnson',
    //     lastName: 'Toterham',
    //     gender: 'Male',
    //     dob: '1945-11-11',
    //     addressLine1: 'SW1A 1AA',
    //     phone: '5557778934',
    //     city: 'London',
    //     postcode: 'SW1A 1AA',
    //     additionalInformation: 'A prozac every 8 hours after meal',
    //     bloodPressures: [{date: '2018-02-01', systolic: '120', diastolic: '80'}, {date: '2018-02-02', systolic: '121', diastolic: '81'}, {date: '2018-02-03', systolic: '120', diastolic: '80'}],
    //     weights: [{date: '2018-02-01', weight: '80', metrics: 'KG'}, {date: '2018-02-02', weight: '80', metrics: 'KG'}, {date: '2018-02-03', weight: '80', metrics: 'KG'}],
    //     temperatures: [{date: '2018-02-01', temperature: '37'}, {date: '2018-02-02', temperature: '37'}, {date: '2018-02-03', temperature: '37'}],
    //   };
    //   chai.request(app)
    //     .post('/api/client')
    //     .send(client)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a('object');
    //       res.body.should.have.a.property('_id');
    //       res.body.should.have.a.property('firstName');
    //       res.body.should.have.a.property('lastName');
    //       res.body.should.have.a.property('gender');
    //       done();
    //     });
    // });
    //
    // it('should create new client', done => {
    //   const client = {
    //     firstName: 'Junior',
    //     lastName: 'Johnston',
    //     gender: 'Male',
    //     dob: '1935-06-23',
    //     addressLine1: 'SW1A 1AA',
    //     phone: '5557778934',
    //     city: 'London',
    //     postcode: 'SW1A 1AA',
    //     additionalInformation: 'A prozac every 8 hours after meal',
    //     bloodPressures: [{date: '2018-02-01', systolic: '120', diastolic: '80'}, {date: '2018-02-02', systolic: '121', diastolic: '81'}, {date: '2018-02-03', systolic: '120', diastolic: '80'}],
    //     weights: [{date: '2018-02-01', weight: '80', metrics: 'KG'}, {date: '2018-02-02', weight: '80', metrics: 'KG'}, {date: '2018-02-03', weight: '80', metrics: 'KG'}],
    //     temperatures: [{date: '2018-02-01', temperature: '37'}, {date: '2018-02-02', temperature: '37'}, {date: '2018-02-03', temperature: '37'}],
    //   };
    //   chai.request(app)
    //     .post('/api/client')
    //     .send(client)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a('object');
    //       res.body.should.have.a.property('_id');
    //       res.body.should.have.a.property('firstName');
    //       res.body.should.have.a.property('lastName');
    //       res.body.should.have.a.property('gender');
    //       done();
    //     });
    // });
    //
    //   it('should get a user by its id', done => {
    //   const client = new Client ({names: 'Dave', surname: 'David', gender: 'M', dob: '14 June 1949',
    //     weight: 56, email: 'cokahraman@hotmail.com', address: '141 NorthWood Way, London, HA6 1RF', userName: 'davedavid',
  //       conditions: 'Eye Sight Problem', additionalServices: 'In need of carrying',
  //       contacts: [{name: 'Dave Chapel', phone: '5555554445454', address: ''}],
  //       medicines: [{name: 'Prozac', dose: 'Every 8 hours after meal'}]})
  //     client.save((error, newClient) => {
  //       chai.request(app)
  //         .get(`/api/client/${newClient.id}`)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a('object');
  //           res.body.should.have.property('userName');
  //           res.body.should.have.property('email');
  //           res.body.should.have.property('address');
  //           res.body.should.have.property('_id').eql(newClient.id);
  //           done();
  //         });
  //     });
  //   });
  //
  //   it('should update a user by its id', done => {
  //     const client = new Client({names: 'Dave', surname: 'David', gender: 'M', dob: '14 June 1949',
  //       weight: 56, email: 'cokahraman@hotmail.com', address: '141 NorthWood Way, London, HA6 1RF', userName: 'davedavid',
  //       conditions: 'Eye Sight Problem', additionalServices: 'In need of carrying',
  //       contacts: [{name: 'Dave Chapel', phone: '5555554445454', address: ''}],
  //       medicines: [{name: 'Prozac', dose: 'Every 8 hours after meal'}]});
  //     client.save((error, newClient) => {
  //       chai.request(app)
  //         .put(`/api/client/${newClient.id}`)
  //         .send({ username: 'User 2' })
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           done();
  //         });
  //     });
  //   });
  //
  //   it('should add users temperature', done => {
  //     const client = new Client({names: 'Dave', surname: 'David', gender: 'M', dob: '14 June 1949',
  //       email: 'cokahraman@hotmail.com', address: '141 NorthWood Way, London, HA6 1RF', userName: 'davedavid'});
  //     client.save((error, newClient) => {
  //       chai.request(app)
  //         .put(`/api/client/${newClient.id}`)
  //         .send({ temperatures: [{date: new Date(), weight: 50}] })
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           done();
  //         });
  //     });
  //   });

    // it('should delete a user by its id', done => {
    //   const client = new Client({ email: 'user@example.com' });
    //   client.save((error, newClient) => {
    //     chai.request(app)
    //       .delete(`/api/client/${newClient.id}`)
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         done();
    //       });
    //   });
    // });

  });

});


