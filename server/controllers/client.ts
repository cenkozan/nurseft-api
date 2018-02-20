import Client from '../models/client';
import BaseCtrl from './base';

export default class ClientCtrl extends BaseCtrl {
  model = Client;

  // Overriding the base method
  getAll = (req, res) => {
    this.model.find({}, 'firstName lastName phone gender dob', (err, docs) => {
      if (err) {
        return console.error(err);
      }
      res.json(docs);
    });
  };

  insertTemperature = (req, res) => {
    this.model.findById(req.params.id, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      if (docs.temperatures) {
        docs.temperatures.push(req.body);
      } else {
        docs.temperatures = [req.body];
      }
      docs.save(function (err, data) {
        if (err) {
          return console.error(err);
        }
        res.json(data);
      });
    });
  };

  insertBloodPressure = (req, res) => {
    this.model.findById(req.params.id, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      if (docs.bloodPressures) {
        docs.bloodPressures.push(req.body);
      } else {
        docs.bloodPressures = [req.body];
      }
      docs.save(function (err, data) {
        if (err) {
          return console.error(err);
        }
        res.json(data);
      });
    });
  };

  insertWeight = (req, res) => {
    this.model.findById(req.params.id, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      if (docs.weights) {
        docs.weights.push(req.body);
      } else {
        docs.weights = [req.body];
      }
      docs.save(function (err, data) {
        if (err) {
          return console.error(err);
        }
        res.json(data);
      });
    });
  };

}

