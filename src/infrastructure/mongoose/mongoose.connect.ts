import mongoose from 'mongoose'
import 'dotenv/config'

export class Mongoose {

  public connect(){
    const host = 'mongodb://'+process.env.HOST + '/' + process.env.DATABASE;
    mongoose.connect(host);
    return mongoose.connection
  }
}