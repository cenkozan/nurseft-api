"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const user_1 = require("../models/user");
const userEndpoints_1 = require("../models/userEndpoints");
const base_1 = require("./base");
class UserCtrl extends base_1.default {
    constructor() {
        super(...arguments);
        this.model = user_1.default;
        this.login = (req, res) => {
            this.model.findOne({ email: req.body.email }, (err, user) => {
                if (!user) {
                    return res.sendStatus(403);
                }
                user.comparePassword(req.body.password, (error, isMatch) => {
                    if (!isMatch) {
                        return res.sendStatus(403);
                    }
                    const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
                    userEndpoints_1.default.findOne({ user: user._id }, (err, userEndpoint) => {
                        res.status(200).json({ token: token, endpoint: userEndpoint.endpoint });
                    });
                });
            });
        };
    }
}
exports.default = UserCtrl;
//# sourceMappingURL=user.js.map