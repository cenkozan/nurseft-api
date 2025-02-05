"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
class ReportItem {
    constructor(data, hours, appointments, revenue) {
        this.data = data;
        this.hours = hours;
        this.appointments = appointments;
        this.revenue = revenue;
    }
}
exports.ReportItem = ReportItem;
class WeekStructure {
    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.startDateAsString = moment(startDate).format('MMM D');
        this.endDateAsString = moment(endDate).format('MMM D');
    }
    toString() {
        return this.startDateAsString + '-' + this.endDateAsString;
    }
}
exports.WeekStructure = WeekStructure;
//# sourceMappingURL=Common.js.map