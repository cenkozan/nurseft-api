import BaseCtrl from './base';
import Carer from '../models/carer';
import Appointment from '../models/appointment';

export default class AppointmentCtrl extends BaseCtrl {
  model = Appointment;

  getAllByCarer = (req, res) => {
    this.model.find({ carer: req.params.id}, (err, docs) => {
      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  }

  getAllByClient = (req, res) => {
    this.model.find({ client: req.params.id}, (err, docs) => {
      if (err) { return console.error(err); }
      res.status(200).json(docs);
    });
  }

}
