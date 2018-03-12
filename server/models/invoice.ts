'use strict';

import * as mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
  client: String,
  start: Date,
  end: Date,
  invoiceId: Number,
  content: String
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

export default Invoice;
