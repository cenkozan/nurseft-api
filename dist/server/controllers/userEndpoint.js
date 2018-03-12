"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userEndpoints_1 = require("../models/userEndpoints");
class UserEndpointCtrl {
    constructor() {
        this.insert = (req, res) => {
            const obj = new userEndpoints_1.default({ user: req.params.id, endpoint: req.body.endpoint });
            obj.save((err, item) => {
                // 11000 is the code for duplicate key error
                if (err && err.code === 11000) {
                    res.sendStatus(400);
                }
                if (err) {
                    return console.error(err);
                }
                res.status(200).json(item);
            });
        };
    }
}
exports.default = UserEndpointCtrl;
//# sourceMappingURL=userEndpoint.js.map