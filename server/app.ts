import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';

import setRoutes from './routes';

const app = express();
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoDBURIString:string = process.env.MONGODB_URI;

mongoose.connect(mongoDBURIString, function (err, response) {
  if (err) {
    console.log ('ERROR connecting to: ' + mongoDBURIString + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + mongoDBURIString);

    setRoutes(app);

    app.get('/*', function(req, res) {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    if (!module.parent) {
      app.listen(app.get('port'), () => {
        console.log('Angular Full Stack listening on port ' + app.get('port'));
      });
    }
  }
});

export { app };
