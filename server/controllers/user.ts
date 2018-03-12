import * as jwt from 'jsonwebtoken';

import User from '../models/user';
import UserEndpoint from '../models/userEndpoints';
import BaseCtrl from './base';

export default class UserCtrl extends BaseCtrl {
  model = User;

  login = (req, res) => {
    this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        UserEndpoint.findOne( { user: user._id }, (err, userEndpoint) => {
          res.status(200).json({ token: token, endpoint: userEndpoint ? userEndpoint.endpoint : null });
        });
      });
    });
  }

}
