import { MongooseModule } from '@nestjs/mongoose';

const mongoDbConnection = process.env.MONGODB_CONNECT_URL;
const dbName = process.env.MONGODB_DBNAME;

export default MongooseModule.forRoot(mongoDbConnection, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  dbName,
});
