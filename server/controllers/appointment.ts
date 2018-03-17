import BaseCtrl from './base';
import Appointment from '../models/appointment';
import * as moment from 'moment';
import {ReportItem, WeekStructure} from '../Common';

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

  getAllReportByClient= (req, res) => {
    this.model.find({
      client: req.params.id
    }, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      const weekdayReport: ReportItem[] = [];
      let totalHour: number = 0;
      let totalIncome: number = 0;
      docs.forEach(appointment => {
        const startDate = moment(appointment.start);
        const endDate = moment(appointment.end);
        const count = endDate.diff(startDate, 'minutes');
        totalHour = Math.floor(totalHour + count / 60);
        if (appointment.sleepover) {
          totalIncome += appointment.rate;
        } else {
          totalIncome = totalIncome + (count * (appointment.rate / 60));
        }
      });
      weekdayReport.push(new ReportItem('all', totalHour, docs.length, totalIncome));
      res.status(200).json(weekdayReport);
    });
  };

  getAllReportByCarer= (req, res) => {
    this.model.find({
      carer: req.params.id
    }, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      const weekdayReport: ReportItem[] = [];
      let totalHour: number = 0;
      let totalIncome: number = 0;
      docs.forEach(appointment => {
        const startDate = moment(appointment.start);
        const endDate = moment(appointment.end);
        const count = endDate.diff(startDate, 'minutes');
        totalHour = Math.floor(totalHour + count / 60);
        if (appointment.sleepover) {
          totalIncome += appointment.rate;
        } else {
          totalIncome = totalIncome + (count * (appointment.rate / 60));
        }
      });
      weekdayReport.push(new ReportItem('all', totalHour, docs.length, totalIncome));
      res.status(200).json(weekdayReport);
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
      const weekdayReport: ReportItem[] = [];
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
          const startDate = moment(appointment.start);
          const endDate = moment(appointment.end);
          const count = endDate.diff(startDate, 'minutes');
          totalHour = Math.floor(totalHour + count / 60);
          if (appointment.sleepover) {
            totalIncome += appointment.rate;
          } else {
            totalIncome = totalIncome + (count * (appointment.rate / 60));
          }
        });
        weekdayReport.push(new ReportItem(days[i], totalHour, appointmentsMatching.length, totalIncome));
      }
      res.status(200).json(weekdayReport);
    });
  };

  getDailyReportByClient = (req, res) => {
    let type: moment.unitOfTime.StartOf = 'week';
    this.model.find({
      client: req.params.id,
      start: {$gte: moment().startOf(type).add(1, 'days').toDate()},
      end: {$lte: moment().startOf(type).add(8, 'days').toDate()}
    }, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      const weekdayReport: ReportItem[] = [];
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
          const startDate = moment(appointment.start);
          const endDate = moment(appointment.end);
          const count = endDate.diff(startDate, 'minutes');
          totalHour = Math.floor(totalHour + count / 60);
          if (appointment.sleepover) {
            totalIncome += appointment.rate;
          } else {
            totalIncome = totalIncome + (count * (appointment.rate / 60));
          }
        });
        weekdayReport.push(new ReportItem(days[i], totalHour, appointmentsMatching.length, totalIncome));
      }
      res.status(200).json(weekdayReport);
    });
  };

  getDailyReportByCarer = (req, res) => {
    let type: moment.unitOfTime.StartOf = 'week';
    this.model.find({
      carer: req.params.id,
      start: {$gte: moment().startOf(type).add(1, 'days').toDate()},
      end: {$lte: moment().startOf(type).add(8, 'days').toDate()}
    }, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      const weekdayReport: ReportItem[] = [];
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
          const startDate = moment(appointment.start);
          const endDate = moment(appointment.end);
          const count = endDate.diff(startDate, 'minutes');
          totalHour = Math.floor(totalHour + count / 60);
          if (appointment.sleepover) {
            totalIncome += appointment.rate;
          } else {
            totalIncome = totalIncome + (count * (appointment.rate / 60));
          }
        });
        weekdayReport.push(new ReportItem(days[i], totalHour, appointmentsMatching.length, totalIncome));
      }
      res.status(200).json(weekdayReport);
    });
  };

  getWeeklyReport = (req, res) => {
    let type: moment.unitOfTime.StartOf = 'year';
    this.model.find({
      start: {$gte: moment().startOf(type).toDate()}
    }, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      const weekdayReport: ReportItem[] = [];
      const weekCount = 52;
      const weekArray: WeekStructure[] = [];
      for (let i = 0; i < weekCount; i++) {
        weekArray.push(new WeekStructure(moment().startOf(type).add(i, 'week').toDate(),
          moment().startOf(type).add(i, 'week').add(6, 'day').toDate()));
        const appointmentsMatching: any[] = [];
        docs.forEach(appointment => {
          const startDate = moment(appointment.start);
          if (startDate.isBetween(moment(weekArray[i].startDate), moment(weekArray[i].endDate))) {
            appointmentsMatching.push(appointment);
          }
        });
        let totalHour: number = 0;
        let totalIncome: number = 0;
        appointmentsMatching.forEach(appointment => {
          const startDate = moment(appointment.start);
          const endDate = moment(appointment.end);
          const count = endDate.diff(startDate, 'minutes');
          totalHour = Math.floor(totalHour + count / 60);
          if (appointment.sleepover) {
            totalIncome += appointment.rate;
          } else {
            totalIncome = totalIncome + (count * (appointment.rate / 60));
          }
        });
        weekdayReport.push(new ReportItem(String(moment(weekArray[i].startDate).week()), totalHour, appointmentsMatching.length, totalIncome));
        if (moment().isSame(moment().startOf(type).add(i, 'week'), 'week')) {
          break;
        }
      }
      res.status(200).json(weekdayReport);
    });
  };

  getWeeklyReportByClient = (req, res) => {
    let type: moment.unitOfTime.StartOf = 'year';
    this.model.find({
      client: req.params.id,
      start: {$gte: moment().startOf(type).toDate()}
    }, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      const weekdayReport: ReportItem[] = [];
      const weekCount = 52;
      const weekArray: WeekStructure[] = [];
      for (let i = 0; i < weekCount; i++) {
        weekArray.push(new WeekStructure(moment().startOf(type).add(i, 'week').toDate(),
          moment().startOf(type).add(i, 'week').add(6, 'day').toDate()));
        const appointmentsMatching: any[] = [];
        docs.forEach(appointment => {
          const startDate = moment(appointment.start);
          if (startDate.isBetween(moment(weekArray[i].startDate), moment(weekArray[i].endDate))) {
            appointmentsMatching.push(appointment);
          }
        });
        let totalHour: number = 0;
        let totalIncome: number = 0;
        appointmentsMatching.forEach(appointment => {
          const startDate = moment(appointment.start);
          const endDate = moment(appointment.end);
          const count = endDate.diff(startDate, 'minutes');
          totalHour = Math.floor(totalHour + count / 60);
          if (appointment.sleepover) {
            totalIncome += appointment.rate;
          } else {
            totalIncome = totalIncome + (count * (appointment.rate / 60));
          }
        });
        weekdayReport.push(new ReportItem(String(moment(weekArray[i].startDate).week()), totalHour, appointmentsMatching.length, totalIncome));
        if (moment().isSame(moment().startOf(type).add(i, 'week'), 'week')) {
          break;
        }
      }
      res.status(200).json(weekdayReport);
    });
  };

  getWeeklyReportByCarer = (req, res) => {
    let type: moment.unitOfTime.StartOf = 'year';
    this.model.find({
      carer: req.params.id,
      start: {$gte: moment().startOf(type).toDate()}
    }, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      const weekdayReport: ReportItem[] = [];
      const weekCount = 52;
      const weekArray: WeekStructure[] = [];
      for (let i = 0; i < weekCount; i++) {
        weekArray.push(new WeekStructure(moment().startOf(type).add(i, 'week').toDate(),
          moment().startOf(type).add(i, 'week').add(6, 'day').toDate()));
        const appointmentsMatching: any[] = [];
        docs.forEach(appointment => {
          const startDate = moment(appointment.start);
          if (startDate.isBetween(moment(weekArray[i].startDate), moment(weekArray[i].endDate))) {
            appointmentsMatching.push(appointment);
          }
        });
        let totalHour: number = 0;
        let totalIncome: number = 0;
        appointmentsMatching.forEach(appointment => {
          const startDate = moment(appointment.start);
          const endDate = moment(appointment.end);
          const count = endDate.diff(startDate, 'minutes');
          totalHour = Math.floor(totalHour + count/60);
          if (appointment.sleepover) {
            totalIncome += appointment.rate;
          } else {
            totalIncome = totalIncome + (count * (appointment.rate / 60));
          }
        });
        weekdayReport.push(new ReportItem(String(moment(weekArray[i].startDate).week()), totalHour, appointmentsMatching.length, totalIncome));
        if (moment().isSame(moment().startOf(type).add(i, 'week'), 'week')) {
          break;
        }
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
      const weekdayReport: ReportItem[] = [];
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
          const startDate = moment(appointment.start);
          const endDate = moment(appointment.end);
          const count = endDate.diff(startDate, 'minutes');
          totalHour = Math.floor(totalHour + count/60);
          if (appointment.sleepover) {
            totalIncome += appointment.rate;
          } else {
            totalIncome = totalIncome + (count * (appointment.rate / 60));
          }
        });
        weekdayReport.push(new ReportItem(moment().startOf(type).add(i, 'month').format('MMMM'), totalHour, appointmentsMatching.length, totalIncome));
        if (moment().isSame(moment().startOf(type).add(i, 'month'), 'month')) {
          break;
        }
      }
      res.status(200).json(weekdayReport);
    });
  };

  getMonthlyReportByClient = (req, res) => {
    let type: moment.unitOfTime.StartOf = 'year';
    this.model.find({
      client: req.params.id,
      start: {$gte: moment().startOf(type).toDate()}
    }, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      const weekdayReport: ReportItem[] = [];
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
          const startDate = moment(appointment.start);
          const endDate = moment(appointment.end);
          const count = endDate.diff(startDate, 'minutes');
          totalHour = Math.floor(totalHour + count / 60);
          if (appointment.sleepover) {
            totalIncome += appointment.rate;
          } else {
            totalIncome = totalIncome + (count * (appointment.rate / 60));
          }
        });
        weekdayReport.push(new ReportItem(moment().startOf(type).add(i, 'month').format('MMMM'), totalHour, appointmentsMatching.length, totalIncome));
        if (moment().isSame(moment().startOf(type).add(i, 'month'), 'month')) {
          break;
        }
      }
      res.status(200).json(weekdayReport);
    });
  };

  getMonthlyReportByCarer = (req, res) => {
    let type: moment.unitOfTime.StartOf = 'year';
    this.model.find({
      carer: req.params.id,
      start: {$gte: moment().startOf(type).toDate()}
    }, (err, docs) => {
      if (err) {
        return console.error(err);
      }
      const weekdayReport: ReportItem[] = [];
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
          const startDate = moment(appointment.start);
          const endDate = moment(appointment.end);
          const count = endDate.diff(startDate, 'minutes');
          totalHour = Math.floor(totalHour + count / 60);
          if (appointment.sleepover) {
            totalIncome += appointment.rate;
          } else {
            totalIncome = totalIncome + (count * (appointment.rate / 60));
          }
        });
        weekdayReport.push(new ReportItem(moment().startOf(type).add(i, 'month').format('MMMM'), totalHour, appointmentsMatching.length, totalIncome));
        if (moment().isSame(moment().startOf(type).add(i, 'month'), 'month')) {
          break;
        }
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
