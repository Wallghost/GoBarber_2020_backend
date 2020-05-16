import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename(request, file, callback) {
      const hashFile = crypto.randomBytes(10).toString('HEX');
      const fileName = `${hashFile}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
