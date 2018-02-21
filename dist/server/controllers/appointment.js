"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const appointment_1 = require("../models/appointment");
const moment = require("moment");
class AppointmentCtrl extends base_1.default {
    constructor() {
        super(...arguments);
        this.model = appointment_1.default;
        this.getAllByCarer = (req, res) => {
            this.model.find({ carer: req.params.id }, (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                res.status(200).json(docs);
            });
        };
        this.getAllByClient = (req, res) => {
            this.model.find({ client: req.params.id }, (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                res.status(200).json(docs);
            });
        };
        this.countTotalHours = (req, res) => {
            this.model.find({}, (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                let sum = 0;
                docs.forEach(appointment => {
                    const startDate = moment(appointment.start);
                    const endDate = moment(appointment.end);
                    const count = endDate.diff(startDate, 'hours');
                    sum = sum + count;
                });
                res.status(200).json(sum);
            });
        };
        this.countTotalRevenue = (req, res) => {
            this.model.find({}, (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                let sum = 0;
                docs.forEach(appointment => {
                    sum = sum + appointment.rate;
                });
                res.status(200).json(sum);
            });
        };
    }
}
exports.default = AppointmentCtrl;
//# sourceMappingURL=appointment.js.map