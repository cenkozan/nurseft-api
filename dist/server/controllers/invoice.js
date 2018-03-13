"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const invoice_1 = require("../models/invoice");
class InvoiceCtrl extends base_1.default {
    constructor() {
        super(...arguments);
        this.model = invoice_1.default;
        this.getByClient = (req, res) => {
            this.model.find({ client: req.params.id }, (err, invoices) => {
                if (err)
                    return err;
                res.status(200).json(invoices);
            });
        };
        this.getLastInvoice = (req, res) => {
            this.model.find((err, invoices) => {
                if (err)
                    return err;
                res.status(200).json(invoices.sort().pop().invoiceId);
            });
        };
    }
}
exports.default = InvoiceCtrl;
//# sourceMappingURL=invoice.js.map