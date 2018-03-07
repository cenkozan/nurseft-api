import BaseCtrl from './base';
import Appointment from '../models/appointment';
import * as moment from 'moment';
import { WeekdayReportItem} from '../Common';
import {app} from '../app';

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
        if (appointment.sleepover) {
         sum += appointment.sleepoverRate;
        } else {
          const startDate = moment(appointment.start);
          const endDate = moment(appointment.end);
          const count = endDate.diff(startDate, 'hours');
          sum = sum + (count * appointment.rate);
        }
      });
      res.status(200).json(sum);
    });
  };

  getAppointmentsOfClientInDateRange = (req, res) => {
    this.model.find({client: req.params.id, start: {$gte: req.params.start}, end: {$lte: req.params.end}}, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      res.status(200).json(docs);
    });
  };

  getWeeklyReport = (req, res) => {
    let type: moment.unitOfTime.StartOf = 'week';
    this.model.find({start: {$gte: moment().startOf(type).add(1,'days')}, end: {$lte: moment().startOf(type).add(8,'days')}}, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      const weekdayReport: WeekdayReportItem[] = [];
      const days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      for (let i = 0; i <=6; i++) {
        const appointmentsMatching: any[] = [];
        docs.forEach(appointment => {
          const startDate = moment(appointment.start);
          const endDate = moment(appointment.end);
          if (startDate.isAfter(moment().startOf(type).add(i + 1,'days')) && moment(endDate).isBetween(moment().startOf(type).add(i,'days'), moment().startOf(type).add(i + 2,'days'))) {
            appointmentsMatching.push(appointment);
          }
        });
        let total = 0;
        let totalHour: number = 0;
        let totalIncome: number = 0;
        appointmentsMatching.forEach(appointment => {
          if (appointment.sleepover) {
            totalIncome += appointment.sleepoverRate;
          } else {
            const startDate = moment(appointment.start);
            const endDate = moment(appointment.end);
            const count = endDate.diff(startDate, 'hours');
            totalHour = totalHour + (count);
            totalIncome = totalIncome + (count * appointment.rate);
          }
        });
        weekdayReport.push(new WeekdayReportItem(days[i], totalHour, appointmentsMatching.length, totalIncome));
      }
      res.status(200).json(weekdayReport);
    });
  };

  getWeeklyReportByCarer = (req, res) => {
    let type: moment.unitOfTime.StartOf = 'week';
    this.model.find({carer: req.params.id, start: {$gte: moment().startOf(type).add(1,'days')}, end: {$lte: moment().startOf(type).add(8,'days')}}, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      console.debug(docs);
      const weekdayReport: WeekdayReportItem[] = [];
      const days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      for (let i = 0; i <=6; i++) {
        const appointmentsMatching: any[] = [];
        docs.forEach(appointment => {
          const startDate = moment(appointment.start);
          const endDate = moment(appointment.end);
          if (startDate.isAfter(moment().startOf(type).add(i + 1,'days')) && moment(endDate).isBetween(moment().startOf(type).add(i,'days'), moment().startOf(type).add(i + 2,'days'))) {
            appointmentsMatching.push(appointment);
          }
        });
        let total = 0;
        let totalHour: number = 0;
        let totalIncome: number = 0;
        appointmentsMatching.forEach(appointment => {
          if (appointment.sleepover) {
            totalIncome += appointment.sleepoverRate;
          } else {
            const startDate = moment(appointment.start);
            const endDate = moment(appointment.end);
            const count = endDate.diff(startDate, 'hours');
            totalHour = totalHour + (count);
            totalIncome = totalIncome + (count * appointment.rate);
          }
        });
        weekdayReport.push(new WeekdayReportItem(days[i], totalHour, appointmentsMatching.length, totalIncome));
      }
      res.status(200).json(weekdayReport);
    });
  };

}
















