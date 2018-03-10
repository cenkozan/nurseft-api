import Client from '../models/client';
import BaseCtrl from './base';
import * as mongoose from 'mongoose';

export default class ClientCtrl extends BaseCtrl {
  model = Client;

  // Overriding the base method
  getAll = (req, res) => {
    this.model.find({}, 'firstName lastName phone gender dob currentSleepoverRate currentRate', (err, docs) => {
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

  insertIncident = (req, res) => {
    this.model.findById(req.params.id, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      const incidentToInsert = req.body;
      const id = mongoose.Types.ObjectId();
      incidentToInsert._id = id;
      if (docs.incidents) {
        docs.incidents.push(incidentToInsert);
      } else {
        docs.incidents = [incidentToInsert];
      }
      docs.save(function (err, data) {
        if (err) {
          return console.error(err);
        }
        res.json(incidentToInsert);
      });
    });
  };

  updateIncident = (req, res) => {
    this.model.findById(req.params.id, (err, doc) => {
      if (err) {
        return console.error(err);
      }
      if (doc.incidents) {
        if (doc.incidents.indexOf(req.body) !== -1) {
          doc.incidents.splice(doc.incidents.indexOf(req.body));
          doc.save(function (err, data) {
            if (err) {
              return console.error(err);
            }
            res.json(data);
          });
        }
      }
    });
  };

  deleteIncident = (req, res) => {
    this.model.findById(req.params.id, (err, doc) => {
      if (err) {
        return console.error(err);
      }
      if (doc.incidents) {
        let found = false;
        doc.incidents.forEach(incident => {
          if (incident._id == req.params.incident_id) {
            found = true;
            doc.incidents.splice(doc.incidents.indexOf(req.body));
            console.debug('here is before save: ', doc);
            doc.save(function (err, data) {
              if (err) {
                return console.error(err);
              }
              res.status(200).json(data.incidents);
            });
          }
        });
        if (!found) {
          res.sendStatus(400);
        }
      }
    });
  };

  deleteFileInIncident = (req, res) => {
    this.model.findById(req.params.id, (err, doc) => {
      if (err) {
        return console.error(err);
      }
      if (doc.incidents) {
        let found = false;
        doc.incidents.forEach(incident => {
          if (incident._id == req.params.incident_id) {
            for(let i = 0; i < incident.files.length; i++) {
              if (incident.files[i]._id == req.params.file_id) {
                found = true;
                incident.files.splice(i, 1);
                doc.save(function (err, data) {
                  if (err) {
                    return console.error(err);
                  }
                  res.status(200).json(data.incidents);
                });
                return;
              }
            }
          }
        });
        if (!found) {
          res.sendStatus(400);
        }
      }
    });
  };

}

