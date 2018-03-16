import * as moment from 'moment';

class ReportItem {
  constructor(private data: string, private hours: number, private appointments: number, private revenue: number) {
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
    this.startDateAsString = moment(startDate).format('MMM D');
    this.endDateAsString = moment(endDate).format('MMM D')
  }
  toString() {
    return this.startDateAsString + '-' + this.endDateAsString;
  }
}

export {ReportItem, WeekStructure};