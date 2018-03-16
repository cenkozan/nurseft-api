"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
class WeekdayReportItem {
    constructor(day, hours, appointments, revenue) {
        this.day = day;
        this.hours = hours;
        this.appointments = appointments;
        this.revenue = revenue;
    }
}
exports.WeekdayReportItem = WeekdayReportItem;
class WeekStructure {
    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.startDateAsString = moment(startDate).format('MMMM Do YYYY');
        this.endDateAsString = moment(endDate).format('MMMM Do YYYY');
    }
    toString() {
        return this.startDateAsString + ' - ' + this.endDateAsString;
    }
}
exports.WeekStructure = WeekStructure;
//# sourceMappingURL=Common.js.map