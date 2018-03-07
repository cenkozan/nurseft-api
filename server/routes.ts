import * as express from 'express';

import CatCtrl from './controllers/cat';
import ClientCtrl from './controllers/client';
import UserCtrl from './controllers/user';
import CarerCtrl from './controllers/carer';
import AppointmentCtrl from './controllers/appointment';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const clientCtrl = new ClientCtrl();
  const carerCtrl = new CarerCtrl();
  const userCtrl = new UserCtrl();
  const appointmentCtrl = new AppointmentCtrl();

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
  router.route('/appointment/client/:id/:start/:end').get(appointmentCtrl.getAppointmentsOfClientInDateRange);
  router.route('/appointment/reports/total-hours').get(appointmentCtrl.countTotalHours);
  router.route('/appointment/reports/total-revenue').get(appointmentCtrl.countTotalRevenue);
  router.route('/appointment/reports/weekly-report').get(appointmentCtrl.getWeeklyReport);
  router.route('/appointment/carer/:id/reports/weekly-report').get(appointmentCtrl.getWeeklyReportByCarer);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
