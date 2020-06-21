"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const express = require("express");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const PORT = Number(process.env.PORT) || 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use('/files', express.static(path_1.resolve(__dirname, '..', 'uploads')));
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map