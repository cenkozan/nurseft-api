import Cat from '../models/cat';
import BaseCtrl from './base';
import Invoice from '../models/invoice';

export default class InvoiceCtrl extends BaseCtrl {
  model = Invoice;

  getByClient = (req, res) => {
    this.model.find({ client: req.params.id }, (err, invoices) => {
      if (err) return err;
      res.status(200).json(invoices);
    })
  }
}
