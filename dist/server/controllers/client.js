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
    }
}
exports.default = ClientCtrl;
//# sourceMappingURL=client.js.map