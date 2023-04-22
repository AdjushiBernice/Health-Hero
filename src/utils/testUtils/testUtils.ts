import mongoose, { ConnectOptions } from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = new MongoMemoryServer();

interface MongooseOpts {
  useNewUrlParser?: boolean;
  useCreateIndex?: boolean;
  useUnifiedTopology?: boolean;
  useFindAndModify?: boolean;
}

export const dbConnect = async () => {
  const uri = await mongoServer.getUri();

  const mongooseOpts: ConnectOptions & Partial<MongooseOpts> = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  await mongoose.connect(uri, mongooseOpts);
};



 export const dbDisconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  };

  export const dbDropCollection=async()=>{
 const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
  await collection.drop()
  }
  }