import BaseCtrl from './base';
import Appointment from '../models/appointment';
import * as moment from 'moment';
import {WeekdayReportItem, WeekStructure} from '../Common';

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
        const count = endDate.diff(startDate, 'minutes');
        sum = sum + count;
      });
      res.status(200).json(Math.floor(sum / 60));
    });
  };

  countTotalRevenue = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      let sum = 0;
      docs.forEach(appointment => {
        if (appointment.sleepover) {
          sum = sum + appointment.rate;
        } else {
          const startDate = moment(appointment.start);
          const endDate = moment(appointment.end);
          const count = endDate.diff(startDate, 'minutes');
          sum = sum + (count * (appointment.rate / 60));
        }
      });
      res.status(200).json(Math.floor(sum));
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

  getAppointmentsOfCarerInDateRange = (req, res) => {
    this.model.find({carer: req.params.id, start: {$gte: req.params.start}, end: {$lte: req.params.end}}, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      res.status(200).json(docs);
    });
  };

  getDailyReport = (req, res) => {
    let type: moment.unitOfTime.StartOf = 'week';
    this.model.find({
      start: {$gte: moment().startOf(type).add(1, 'days').toDate()},
      end: {$lte: moment().startOf(type).add(8, 'days').toDate()}
    }, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      const weekdayReport: WeekdayReportItem[] = [];
      const days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      for (let i = 0; i <= 6; i++) {
        const appointmentsMatching: any[] = [];
        docs.forEach(appointment => {
          const startDate = moment(appointment.start);
          const endDate = moment(appointment.end);
          if (startDate.isSame(moment().startOf(type).add(i + 1, 'days'), 'day')) {
            appointmentsMatching.push(appointment);
          }
        });
        let total = 0;
        let totalHour: number = 0;
        let totalIncome: number = 0;
        appointmentsMatching.forEach(appointment => {
          if (appointment.sleepover) {
            totalIncome += appointment.rate;
          } else {
            const startDate = moment(appointment.start);
            const endDate = moment(appointment.end);
            const count = endDate.diff(startDate, 'minutes');
            totalHour = totalHour + count / 60;
            totalIncome = totalIncome + (count * (appointment.rate / 60));
          }
        });
        weekdayReport.push(new WeekdayReportItem(days[i], totalHour, appointmentsMatching.length, totalIncome));
      }
      res.status(200).json(weekdayReport);
    });
  };

  getWeeklyReport = (req, res) => {
    let type: moment.unitOfTime.StartOf = 'week';
    this.model.find({
      start: {$gte: moment().startOf(type).subtract(2, 'months').toDate()}
    }, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      const weekdayReport: WeekdayReportItem[] = [];
      const weekCount = 5;
      const weekArray: WeekStructure[] = [];
      for (let i = 0; i < weekCount; i++) {
        weekArray.push(new WeekStructure(moment().startOf(type).subtract((i), 'week').add(1, 'day').toDate(),
          moment().endOf(type).subtract((i), 'week').add(1, 'day').toDate()));
      }
      for (let i = 0; i < weekCount; i++) {
        const appointmentsMatching: any[] = [];
        docs.forEach(appointment => {
          const startDate = moment(appointment.start);
          if (startDate.isBetween(moment(weekArray[i].startDate), moment(weekArray[i].endDate))) {
            appointmentsMatching.push(appointment);
          }
        });
        let total = 0;
        let totalHour: number = 0;
        let totalIncome: number = 0;
        appointmentsMatching.forEach(appointment => {
          if (appointment.sleepover) {
            totalIncome += appointment.rate;
          } else {
            const startDate = moment(appointment.start);
            const endDate = moment(appointment.end);
            const count = endDate.diff(startDate, 'minutes');
            totalHour = totalHour + count/60;
            totalIncome = totalIncome + (count * (appointment.rate / 60));
          }
        });
        weekdayReport.push(new WeekdayReportItem(weekArray[i].toString(), totalHour, appointmentsMatching.length, totalIncome));
      }
      res.status(200).json(weekdayReport);
    });
  };

  getMonthlyReport = (req, res) => {
    let type: moment.unitOfTime.StartOf = 'year';
    this.model.find({
      start: {$gte: moment().startOf(type).toDate()}
    }, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      const weekdayReport: WeekdayReportItem[] = [];
      for (let i = 0; i <= 11; i++) {
        const appointmentsMatching: any[] = [];
        docs.forEach(appointment => {
          const startDate = moment(appointment.start);
          if (startDate.isSame(moment().startOf(type).add(i, 'month'), 'month')) {
            appointmentsMatching.push(appointment);
          }
        });
        let total = 0;
        let totalHour: number = 0;
        let totalIncome: number = 0;
        appointmentsMatching.forEach(appointment => {
          if (appointment.sleepover) {
            totalIncome += appointment.rate;
          } else {
            const startDate = moment(appointment.start);
            const endDate = moment(appointment.end);
            const count = endDate.diff(startDate, 'minutes');
            totalHour = totalHour + count/60;
            totalIncome = totalIncome + (count * (appointment.rate / 60));
          }
        });
        weekdayReport.push(new WeekdayReportItem(moment().startOf(type).add(i, 'month').format('MMMM'), totalHour, appointmentsMatching.length, totalIncome));
      }
      res.status(200).json(weekdayReport);
    });
  };

  getDailyReportByCarer = (req, res) => {
    let type: moment.unitOfTime.StartOf = 'week';
    this.model.find({
      carer: req.params.id,
      start: {$gte: moment().startOf(type).add(1, 'days')},
      end: {$lte: moment().startOf(type).add(8, 'days')}
    }, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      const weekdayReport: WeekdayReportItem[] = [];
      const days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      for (let i = 0; i <= 6; i++) {
        const appointmentsMatching: any[] = [];
        docs.forEach(appointment => {
          const startDate = moment(appointment.start);
          const endDate = moment(appointment.end);
          if (startDate.isSame(moment().startOf(type).add(i + 1, 'days'), 'day')) {
            appointmentsMatching.push(appointment);
          }
        });
        let total = 0;
        let totalHour: number = 0;
        let totalIncome: number = 0;
        appointmentsMatching.forEach(appointment => {
          if (appointment.sleepover) {
            totalIncome += appointment.rate;
          } else {
            const startDate = moment(appointment.start);
            const endDate = moment(appointment.end);
            const count = endDate.diff(startDate, 'minutes');
            totalHour = totalHour + count / 60;
            totalIncome = totalIncome + (count * (appointment.rate / 60));
          }
        });
        weekdayReport.push(new WeekdayReportItem(days[i], totalHour, appointmentsMatching.length, totalIncome));
      }
      res.status(200).json(weekdayReport);
    });
  };

  getCarerWorkDoneAllClientsBetweenTimePeriod = (req, res) => {
    this.model.find({carer: req.params.id, start: {$gte: req.params.start}, end: {$lte: req.params.end}}, (err, appointments) => {
      if (err) {
        return console.error(err);
      }
      let sum = 0;
      appointments.forEach(function (appointment, index, array) {
        if (appointment.sleepover) {
          sum += appointment.rate;
        } else {
          const startDate = moment(appointment.start);
          const endDate = moment(appointment.end);
          const diffInMinutes = endDate.diff(startDate, 'minutes');
          sum += diffInMinutes * (appointment.rate / 60);
        }
      });
      res.status(200).json(sum);
    });
  };

}
