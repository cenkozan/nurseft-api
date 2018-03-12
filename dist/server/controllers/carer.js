"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const carer_1 = require("../models/carer");
class CarerCtrl extends base_1.default {
    constructor() {
        super(...arguments);
        this.model = carer_1.default;
    }
}
exports.default = CarerCtrl;
//# sourceMappingURL=carer.js.map