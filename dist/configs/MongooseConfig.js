"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("@nestjs/mongoose");
const mongoDbConnection = process.env.MONGODB_CONNECT_URL;
const dbName = process.env.MONGODB_DBNAME;
exports.default = mongoose_1.MongooseModule.forRoot(mongoDbConnection, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    dbName,
});
//# sourceMappingURL=MongooseConfig.js.map