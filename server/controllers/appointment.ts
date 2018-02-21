import BaseCtrl from './base';
import Appointment from '../models/appointment';
import * as moment from 'moment';

export default class AppointmentCtrl extends BaseCtrl {
  model = Appointment;

  getAllByCarer = (req, res) => {
    this.model.find({carer: req.params.id}, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      res.status(200).json(docs);
    });
  };

  getAllByClient = (req, res) => {
    this.model.find({client: req.params.id}, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      res.status(200).json(docs);
    });
  };

  countTotalHours = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      let sum: number = 0;
      docs.forEach(appointment => {
        const startDate = moment(appointment.start);
        const endDate = moment(appointment.end);
        const count = endDate.diff(startDate, 'hours');
        sum = sum + count;
      });
      res.status(200).json(sum);
    });
  };

  countTotalRevenue = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      let sum: number = 0;
      docs.forEach(appointment => {
        sum = sum + appointment.rate;
      });
      res.status(200).json(sum);
    });
  };

}
