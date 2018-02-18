import BaseCtrl from './base';
import Carer from '../models/carer';

export default class CarerCtrl extends BaseCtrl {
  model = Carer;

  // get = (req, res) => {
  //   this.model.findOne({ _id: req.params.id }).populate('events') (err, obj) => {
  //     if (err) { return console.error(err); }
  //     res.json(obj);
  //   });
  //     // }).populate('');
  // }
}
