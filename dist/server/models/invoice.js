'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const InvoiceSchema = new mongoose.Schema({
    client: String,
    start: Date,
    end: Date,
    invoiceId: Number
});
const Invoice = mongoose.model('Invoice', InvoiceSchema);
exports.default = Invoice;
//# sourceMappingURL=invoice.js.map