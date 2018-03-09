"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../models/client");
const base_1 = require("./base");
const mongoose = require("mongoose");
class ClientCtrl extends base_1.default {
    constructor() {
        super(...arguments);
        this.model = client_1.default;
        // Overriding the base method
        this.getAll = (req, res) => {
            this.model.find({}, 'firstName lastName phone gender dob currentSleepoverRate currentRate', (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                res.json(docs);
            });
        };
        this.insertTemperature = (req, res) => {
            this.model.findById(req.params.id, (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                if (docs.temperatures) {
                    docs.temperatures.push(req.body);
                }
                else {
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
        this.insertBloodPressure = (req, res) => {
            this.model.findById(req.params.id, (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                if (docs.bloodPressures) {
                    docs.bloodPressures.push(req.body);
                }
                else {
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
        this.insertWeight = (req, res) => {
            this.model.findById(req.params.id, (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                if (docs.weights) {
                    docs.weights.push(req.body);
                }
                else {
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
        this.insertIncident = (req, res) => {
            this.model.findById(req.params.id, (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                const incidentToInsert = req.body;
                const id = mongoose.Types.ObjectId();
                incidentToInsert._id = id;
                if (docs.incidents) {
                    docs.incidents.push(incidentToInsert);
                }
                else {
                    docs.incidents = [incidentToInsert];
                }
                docs.save(function (err, data) {
                    if (err) {
                        return console.error(err);
                    }
                    res.json(id);
                });
            });
        };
        this.updateIncident = (req, res) => {
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
        this.deleteIncident = (req, res) => {
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
        this.deleteFileInIncident = (req, res) => {
            this.model.findById(req.params.id, (err, doc) => {
                if (err) {
                    return console.error(err);
                }
                if (doc.incidents) {
                    let found = false;
                    doc.incidents.forEach(incident => {
                        if (incident._id == req.params.incident_id) {
                            for (let i = 0; i < incident.files.length; i++) {
                                if (incident.files[i]._id == req.params.file_id) {
                                    console.debug('file id: ', incident.files[i]._id);
                                    console.debug('params: ', req.params.file_id);
                                    found = true;
                                    console.debug('here is the index: ', i);
                                    console.debug('here are files before: ', incident.files);
                                    incident.files.splice(i, 1);
                                    console.debug('here are files after: ', incident.files);
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
}
exports.default = ClientCtrl;
//# sourceMappingURL=client.js.map