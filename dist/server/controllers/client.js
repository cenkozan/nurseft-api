"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../models/client");
const base_1 = require("./base");
class ClientCtrl extends base_1.default {
    constructor() {
        super(...arguments);
        this.model = client_1.default;
    }
}
exports.default = ClientCtrl;
//# sourceMappingURL=client.js.map