import Client from '../models/client';
import BaseCtrl from './base';

export default class ClientCtrl extends BaseCtrl {
  model = Client;

  // Overriding the base method
  getAll = (req, res) => {
    this.model.find({}, 'firstName lastName phone gender dob', (err, docs) => {
      if (err) {
        return console.error(err);
      }
      res.json(docs);
    });
  }
}

