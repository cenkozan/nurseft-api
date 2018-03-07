"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../models/client");
const base_1 = require("./base");
class ClientCtrl extends base_1.default {
    constructor() {
        super(...arguments);
        this.model = client_1.default;
        // Overriding the base method
        this.getAll = (req, res) => {
            this.model.find({}, 'firstName lastName phone gender dob', (err, docs) => {
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
                if (docs.incidents) {
                    docs.incidents.push(req.body);
                }
                else {
                    docs.incidents = [req.body];
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
}
exports.default = ClientCtrl;
//# sourceMappingURL=client.js.map