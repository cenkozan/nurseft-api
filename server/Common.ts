import * as moment from 'moment';

class WeekdayReportItem {
  constructor(private day: string, private hours: number, private appointments: number, private revenue: number) {
  }
}

class WeekStructure {
  startDateAsString: string;
  endDateAsString: string;
  startDate: Date;
  endDate: Date;
  constructor(startDate: Date, endDate: Date) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.startDateAsString = moment(startDate).format('MMMM Do YYYY');
    this.endDateAsString = moment(endDate).format('MMMM Do YYYY')
  }
  toString() {
    return this.startDateAsString + ' - ' + this.endDateAsString;
  }
}

export {WeekdayReportItem, WeekStructure};