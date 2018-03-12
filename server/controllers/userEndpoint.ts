import UserEndpoint from '../models/userEndpoints';

export default class UserEndpointCtrl {

  insert = (req, res) => {
    const obj = new UserEndpoint( { user: req.params.id, endpoint: req.body.endpoint } );
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(400);
      }
      if (err) {
        return console.error(err);
      }
      res.status(200).json(item);
    });
  };

}
