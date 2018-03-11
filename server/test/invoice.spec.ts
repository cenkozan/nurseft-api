import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Invoice from '../models/invoice';

const should = chai.use(chaiHttp).should();

describe('Invoices', () => {

  // beforeEach(done => {
  //   Invoice.remove({}, err => {
  //     done();
  //   });
  // });

  describe('Backend tests for invoices', () => {

    it('should get all the invoices', done => {
      chai.request(app)
        .get('/api/invoices')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get invoice count', done => {
      chai.request(app)
        .get('/api/invoices/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new invoice', done => {
      const invoice = new Invoice ({ client: 'joe', start: new Date(), end: new Date() });
      chai.request(app)
        .post('/api/invoice')
        .send(invoice)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('client');
          res.body.should.have.a.property('start');
          res.body.should.have.a.property('end');
          res.body.should.have.a.property('invoiceId');
          res.body.should.have.a.property('invoiceId').eql(2);
          done();
        });
    });

    it('should get a invoice by its id', done => {
      const invoice = new Invoice ({ title: 'joe' });
      invoice.save((error, newInvoice) => {
        chai.request(app)
          .get(`/api/invoice/${newInvoice.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('_id').eql(newInvoice.id);
            done();
          });
      });
    });

    it('should update a invoice by its id', done => {
      const invoice = new Invoice({ title: 'joe' });
      invoice.save((error, newInvoice) => {
        chai.request(app)
          .put(`/api/invoice/${newInvoice.id}`)
          .send({ start: new Date() })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a invoice by its id', done => {
      const invoice = new Invoice({ title: 'joe' });
      invoice.save((error, newInvoice) => {
        chai.request(app)
          .delete(`/api/invoice/${newInvoice.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

  });

});
