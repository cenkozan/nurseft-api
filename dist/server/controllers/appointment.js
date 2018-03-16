"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const appointment_1 = require("../models/appointment");
const moment = require("moment");
const Common_1 = require("../Common");
class AppointmentCtrl extends base_1.default {
    constructor() {
        super(...arguments);
        this.model = appointment_1.default;
        this.getAllByCarer = (req, res) => {
            this.model.find({ carer: req.params.id }, (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                res.status(200).json(docs);
            });
        };
        this.getAllByClient = (req, res) => {
            this.model.find({ client: req.params.id }, (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                res.status(200).json(docs);
            });
        };
        this.countTotalHours = (req, res) => {
            this.model.find({}, (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                let sum = 0;
                docs.forEach(appointment => {
                    const startDate = moment(appointment.start);
                    const endDate = moment(appointment.end);
                    const count = endDate.diff(startDate, 'minutes');
                    sum = sum + count;
                });
                res.status(200).json(Math.floor(sum / 60));
            });
        };
        this.countTotalRevenue = (req, res) => {
            this.model.find({}, (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                let sum = 0;
                docs.forEach(appointment => {
                    if (appointment.sleepover) {
                        sum = sum + appointment.rate;
                    }
                    else {
                        const startDate = moment(appointment.start);
                        const endDate = moment(appointment.end);
                        const count = endDate.diff(startDate, 'minutes');
                        sum = sum + (count * (appointment.rate / 60));
                    }
                });
                res.status(200).json(Math.floor(sum));
            });
        };
        this.getAppointmentsOfClientInDateRange = (req, res) => {
            this.model.find({ client: req.params.id, start: { $gte: req.params.start }, end: { $lte: req.params.end } }, (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                res.status(200).json(docs);
            });
        };
        this.getAppointmentsOfCarerInDateRange = (req, res) => {
            this.model.find({ carer: req.params.id, start: { $gte: req.params.start }, end: { $lte: req.params.end } }, (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                res.status(200).json(docs);
            });
        };
        this.getDailyReport = (req, res) => {
            let type = 'week';
            this.model.find({
                start: { $gte: moment().startOf(type).add(1, 'days').toDate() },
                end: { $lte: moment().startOf(type).add(8, 'days').toDate() }
            }, (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                const weekdayReport = [];
                const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                for (let i = 0; i <= 6; i++) {
                    const appointmentsMatching = [];
                    docs.forEach(appointment => {
                        const startDate = moment(appointment.start);
                        const endDate = moment(appointment.end);
                        if (startDate.isSame(moment().startOf(type).add(i + 1, 'days'), 'day')) {
                            appointmentsMatching.push(appointment);
                        }
                    });
                    let total = 0;
                    let totalHour = 0;
                    let totalIncome = 0;
                    appointmentsMatching.forEach(appointment => {
                        if (appointment.sleepover) {
                            totalIncome += appointment.rate;
                        }
                        else {
                            const startDate = moment(appointment.start);
                            const endDate = moment(appointment.end);
                            const count = endDate.diff(startDate, 'minutes');
                            totalHour = totalHour + count / 60;
                            totalIncome = totalIncome + (count * (appointment.rate / 60));
                        }
                    });
                    weekdayReport.push(new Common_1.WeekdayReportItem(days[i], totalHour, appointmentsMatching.length, totalIncome));
                }
                res.status(200).json(weekdayReport);
            });
        };
        this.getWeeklyReport = (req, res) => {
            let type = 'year';
            this.model.find({
                start: { $gte: moment().startOf(type).toDate() }
            }, (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                const weekdayReport = [];
                const weekCount = 52;
                const weekArray = [];
                for (let i = 0; i < weekCount; i++) {
                    weekArray.push(new Common_1.WeekStructure(moment().startOf(type).add(i, 'week').toDate(), moment().startOf(type).add(i, 'week').add(6, 'day').toDate()));
                    const appointmentsMatching = [];
                    docs.forEach(appointment => {
                        const startDate = moment(appointment.start);
                        if (startDate.isBetween(moment(weekArray[i].startDate), moment(weekArray[i].endDate))) {
                            appointmentsMatching.push(appointment);
                        }
                    });
                    let totalHour = 0;
                    let totalIncome = 0;
                    appointmentsMatching.forEach(appointment => {
                        if (appointment.sleepover) {
                            totalIncome += appointment.rate;
                        }
                        else {
                            const startDate = moment(appointment.start);
                            const endDate = moment(appointment.end);
                            const count = endDate.diff(startDate, 'minutes');
                            totalHour = totalHour + count / 60;
                            totalIncome = totalIncome + (count * (appointment.rate / 60));
                        }
                    });
                    weekdayReport.push(new Common_1.WeekdayReportItem(weekArray[i].toString(), totalHour, appointmentsMatching.length, totalIncome));
                    if (moment().isSame(moment().startOf(type).add(i, 'week'), 'week')) {
                        break;
                    }
                }
                res.status(200).json(weekdayReport);
            });
        };
        this.getMonthlyReport = (req, res) => {
            let type = 'year';
            this.model.find({
                start: { $gte: moment().startOf(type).toDate() }
            }, (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                const weekdayReport = [];
                for (let i = 0; i <= 11; i++) {
                    const appointmentsMatching = [];
                    docs.forEach(appointment => {
                        const startDate = moment(appointment.start);
                        if (startDate.isSame(moment().startOf(type).add(i, 'month'), 'month')) {
                            appointmentsMatching.push(appointment);
                        }
                    });
                    let total = 0;
                    let totalHour = 0;
                    let totalIncome = 0;
                    appointmentsMatching.forEach(appointment => {
                        if (appointment.sleepover) {
                            totalIncome += appointment.rate;
                        }
                        else {
                            const startDate = moment(appointment.start);
                            const endDate = moment(appointment.end);
                            const count = endDate.diff(startDate, 'minutes');
                            totalHour = totalHour + count / 60;
                            totalIncome = totalIncome + (count * (appointment.rate / 60));
                        }
                    });
                    weekdayReport.push(new Common_1.WeekdayReportItem(moment().startOf(type).add(i, 'month').format('MMMM'), totalHour, appointmentsMatching.length, totalIncome));
                    if (moment().isSame(moment().startOf(type).add(i, 'month'), 'month')) {
                        break;
                    }
                }
                res.status(200).json(weekdayReport);
            });
        };
        this.getDailyReportByCarer = (req, res) => {
            let type = 'week';
            this.model.find({
                carer: req.params.id,
                start: { $gte: moment().startOf(type).add(1, 'days') },
                end: { $lte: moment().startOf(type).add(8, 'days') }
            }, (err, docs) => {
                if (err) {
                    return console.error(err);
                }
                const weekdayReport = [];
                const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                for (let i = 0; i <= 6; i++) {
                    const appointmentsMatching = [];
                    docs.forEach(appointment => {
                        const startDate = moment(appointment.start);
                        const endDate = moment(appointment.end);
                        if (startDate.isSame(moment().startOf(type).add(i + 1, 'days'), 'day')) {
                            appointmentsMatching.push(appointment);
                        }
                    });
                    let total = 0;
                    let totalHour = 0;
                    let totalIncome = 0;
                    appointmentsMatching.forEach(appointment => {
                        if (appointment.sleepover) {
                            totalIncome += appointment.rate;
                        }
                        else {
                            const startDate = moment(appointment.start);
                            const endDate = moment(appointment.end);
                            const count = endDate.diff(startDate, 'minutes');
                            totalHour = totalHour + count / 60;
                            totalIncome = totalIncome + (count * (appointment.rate / 60));
                        }
                    });
                    weekdayReport.push(new Common_1.WeekdayReportItem(days[i], totalHour, appointmentsMatching.length, totalIncome));
                }
                res.status(200).json(weekdayReport);
            });
        };
        this.getCarerWorkDoneAllClientsBetweenTimePeriod = (req, res) => {
            this.model.find({ carer: req.params.id, start: { $gte: req.params.start }, end: { $lte: req.params.end } }, (err, appointments) => {
                if (err) {
                    return console.error(err);
                }
                let sum = 0;
                appointments.forEach(function (appointment, index, array) {
                    if (appointment.sleepover) {
                        sum += appointment.rate;
                    }
                    else {
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
}
exports.default = AppointmentCtrl;
//# sourceMappingURL=appointment.js.map