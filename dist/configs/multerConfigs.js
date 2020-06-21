"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const crypto_1 = require("crypto");
const multer_1 = require("multer");
const path_2 = require("path");
const common_1 = require("@nestjs/common");
exports.editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = path_1.extname(file.originalname);
    const randomName = crypto_1.randomBytes(8).toString('hex');
    callback(null, `${name}${randomName}${fileExtName}`);
};
exports.multerStorage = multer_1.diskStorage({
    destination: path_2.resolve(__dirname, '..', '..', 'uploads'),
    filename: exports.editFileName,
});
exports.imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(new common_1.BadRequestException('Extensão de imagem inválida!'), false);
    }
    callback(null, true);
};
//# sourceMappingURL=multerConfigs.js.map