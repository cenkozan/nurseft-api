"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userEndpointSchema = new mongoose.Schema({
    user: String,
    endpoint: String
});
const UserEndpoint = mongoose.model('UserEndpoint', userEndpointSchema);
exports.default = UserEndpoint;
//# sourceMappingURL=userEndpoints.js.map