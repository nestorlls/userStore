import mongoose from 'mongoose';

interface IMongoConnection {
  mongoUrl: string;
  dbName: string;
}

export class MongoConnection {
  static async connection(options: IMongoConnection) {
    const { mongoUrl, dbName } = options;

    try {
      const mongoConneted = await mongoose.connect(mongoUrl, { dbName });
      if (mongoConneted.STATES.connected === 1) return true;
    } catch (error) {
      console.log('MongoDB connection error: ', error);
      throw error;
    }
  }
}
