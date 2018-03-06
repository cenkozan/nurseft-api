"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const carer_1 = require("../models/carer");
class CarerCtrl extends base_1.default {
    constructor() {
        super(...arguments);
        this.model = carer_1.default;
        // get = (req, res) => {
        //   this.model.findOne({ _id: req.params.id }).populate('events') (err, obj) => {
        //     if (err) { return console.error(err); }
        //     res.json(obj);
        //   });
        //     // }).populate('');
        // }
    }
}
exports.default = CarerCtrl;
//# sourceMappingURL=carer.js.map