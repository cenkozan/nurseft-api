"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const routes_1 = require("./routes");
const app = express();
exports.app = app;
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const mongoDBURIString = process.env.MONGODB_URI;
if (mongoDBURIString) {
    mongoose.connect(mongoDBURIString, function (err, response) {
        if (err) {
            console.log('ERROR connecting to: ' + mongoDBURIString + '. ' + err);
        }
        else {
            console.log('Succeeded connected to: ' + mongoDBURIString);
            routes_1.default(app);
            app.get('/*', function (req, res) {
                res.sendFile(path.join(__dirname, '../public/index.html'));
            });
            if (!module.parent) {
                app.listen(app.get('port'), () => {
                    console.log('Angular Full Stack listening on port ' + app.get('port'));
                });
            }
        }
    });
}
else {
    throw 'No DB connection URL provided in the Environment file or environment variable';
}
//# sourceMappingURL=app.js.map