"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const appointment_1 = require("../models/appointment");
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
    }
}
exports.default = AppointmentCtrl;
//# sourceMappingURL=appointment.js.map