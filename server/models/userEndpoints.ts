import * as mongoose from 'mongoose';

const userEndpointSchema = new mongoose.Schema({
  user: String,
  endpoint: String
});

const UserEndpoint = mongoose.model('UserEndpoint', userEndpointSchema);

export default UserEndpoint;
