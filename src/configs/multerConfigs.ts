import { extname } from 'path';
import { randomBytes } from 'crypto';
import { diskStorage } from 'multer';
import { resolve } from 'path';

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = randomBytes(8).toString('hex');
  callback(null, `${name}${randomName}${fileExtName}`);
};

export const multerStorage = diskStorage({
  destination: resolve(__dirname, '..', '..', 'uploads'),
  filename: editFileName,
});

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Extensão de imagem inválida!'), false);
  }
  callback(null, true);
};
