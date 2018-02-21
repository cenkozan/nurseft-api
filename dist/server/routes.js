"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cat_1 = require("./controllers/cat");
const client_1 = require("./controllers/client");
const user_1 = require("./controllers/user");
const carer_1 = require("./controllers/carer");
const appointment_1 = require("./controllers/appointment");
function setRoutes(app) {
    const router = express.Router();
    const catCtrl = new cat_1.default();
    const clientCtrl = new client_1.default();
    const carerCtrl = new carer_1.default();
    const userCtrl = new user_1.default();
    const appointmentCtrl = new appointment_1.default();
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
    // Appointment
    router.route('/appointments').get(appointmentCtrl.getAll);
    router.route('/appointments/count').get(appointmentCtrl.count);
    router.route('/appointment').post(appointmentCtrl.insert);
    router.route('/appointment/:id').get(appointmentCtrl.get);
    router.route('/appointment/:id').put(appointmentCtrl.update);
    router.route('/appointment/:id').delete(appointmentCtrl.delete);
    router.route('/appointment/client/:id').get(appointmentCtrl.getAllByClient);
    router.route('/appointment/carer/:id').get(appointmentCtrl.getAllByCarer);
    // Reports
    router.route('/reports/total-hours').get(appointmentCtrl.countTotalHours);
    router.route('/reports/total-revenue').get(appointmentCtrl.countTotalRevenue);
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map