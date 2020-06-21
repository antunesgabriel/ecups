import { Connection } from 'typeorm';
import { Connection as MongoseConnection } from 'mongoose';
export declare class AppModule {
    private connection;
    private mongooseConnection;
    constructor(connection: Connection, mongooseConnection: MongoseConnection);
}
