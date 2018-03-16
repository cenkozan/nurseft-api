"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cat_1 = require("./controllers/cat");
const client_1 = require("./controllers/client");
const user_1 = require("./controllers/user");
const carer_1 = require("./controllers/carer");
const appointment_1 = require("./controllers/appointment");
const invoice_1 = require("./controllers/invoice");
const userEndpoint_1 = require("./controllers/userEndpoint");
function setRoutes(app) {
    const router = express.Router();
    const catCtrl = new cat_1.default();
    const clientCtrl = new client_1.default();
    const carerCtrl = new carer_1.default();
    const userCtrl = new user_1.default();
    const appointmentCtrl = new appointment_1.default();
    const invoiceCtrl = new invoice_1.default();
    const userEndPointCtrl = new userEndpoint_1.default();
    // Clients
    router.route('/clients').get(clientCtrl.getAll);
    router.route('/clients/count').get(clientCtrl.count);
    router.route('/client').post(clientCtrl.insert);
    router.route('/client/:id').get(clientCtrl.get);
    router.route('/client/:id').put(clientCtrl.update);
    router.route('/client/:id').delete(clientCtrl.delete);
    router.route('/client/:id/temperature').put(clientCtrl.insertTemperature);
    router.route('/client/:id/blood-pressure').put(clientCtrl.insertBloodPressure);
    router.route('/client/:id/weight').put(clientCtrl.insertWeight);
    router.route('/client/:id/incident').put(clientCtrl.insertIncident);
    router.route('/client/:id/incident/:incident_id/file/:file_id').delete(clientCtrl.deleteFileInIncident);
    router.route('/client/:id/incident/:incident_id').put(clientCtrl.updateIncident);
    router.route('/client/:id/incident/:incident_id').delete(clientCtrl.deleteIncident);
    // Carers
    router.route('/carers').get(carerCtrl.getAll);
    router.route('/carers/count').get(carerCtrl.count);
    router.route('/carer').post(carerCtrl.insert);
    router.route('/carer/:id').get(carerCtrl.get);
    router.route('/carer/:id').put(carerCtrl.update);
    router.route('/carer/:id').delete(carerCtrl.delete);
    // Cats
    router.route('/cats').get(catCtrl.getAll);
    router.route('/cats/count').get(catCtrl.count);
    router.route('/cat').post(catCtrl.insert);
    router.route('/cat/:id').get(catCtrl.get);
    router.route('/cat/:id').put(catCtrl.update);
    router.route('/cat/:id').delete(catCtrl.delete);
    // Users
    router.route('/login').post(userCtrl.login);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);
    // User Endpoint
    router.route('/user/:id/endpoint').post(userEndPointCtrl.insert);
    // Appointment
    router.route('/appointments').get(appointmentCtrl.getAll);
    router.route('/appointments/count').get(appointmentCtrl.count);
    router.route('/appointment').post(appointmentCtrl.insert);
    // Appointment Reports
    router.route('/appointment/reports/total-hours').get(appointmentCtrl.countTotalHours);
    router.route('/appointment/reports/total-revenue').get(appointmentCtrl.countTotalRevenue);
    router.route('/appointment/reports/daily-report').get(appointmentCtrl.getDailyReport);
    router.route('/appointment/reports/weekly-report').get(appointmentCtrl.getWeeklyReport);
    router.route('/appointment/reports/monthly-report').get(appointmentCtrl.getMonthlyReport);
    // Appointment Client Carers
    router.route('/appointment/client/:id').get(appointmentCtrl.getAllByClient);
    router.route('/appointment/carer/:id/reports/weekly-report').get(appointmentCtrl.getDailyReportByCarer);
    router.route('/appointment/carer/:id/reports/owed/:start/:end').get(appointmentCtrl.getCarerWorkDoneAllClientsBetweenTimePeriod);
    // Ordering important !!!
    router.route('/appointment/client/:id/:start/:end').get(appointmentCtrl.getAppointmentsOfClientInDateRange);
    router.route('/appointment/carer/:id/:start/:end').get(appointmentCtrl.getAppointmentsOfCarerInDateRange);
    router.route('/appointment/carer/:id').get(appointmentCtrl.getAllByCarer);
    // Ordering important !!!
    router.route('/appointment/:id').get(appointmentCtrl.get);
    router.route('/appointment/:id').put(appointmentCtrl.update);
    router.route('/appointment/:id').delete(appointmentCtrl.delete);
    // Invoice
    router.route('/invoices').get(invoiceCtrl.getAll);
    router.route('/invoices/count').get(invoiceCtrl.count);
    router.route('/invoice').post(invoiceCtrl.insert);
    router.route('/invoice/latest').get(invoiceCtrl.getLastInvoice);
    router.route('/invoice/:id').get(invoiceCtrl.get);
    router.route('/invoice/:id').put(invoiceCtrl.update);
    router.route('/invoice/:id').delete(invoiceCtrl.delete);
    router.route('/invoice/client/:id').get(invoiceCtrl.getByClient);
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map