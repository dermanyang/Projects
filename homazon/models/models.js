import mongoose from 'mongoose'
var Schema = mongoose.Schema
mongoose.connect(process.env.MONGODB_URI);


var User = new Schema({
  //object
  username: {
    type: String,
    required: true,
  },
  // email: {
  //   type: String,
  //   required: true,
  // },
  password: {
    type: String,
    required: true
  }
})

var Product = new Schema({
  title: String,
  description: String,
  imageUri: String
})

export default {
  User: mongoose.model('User', User)
}
