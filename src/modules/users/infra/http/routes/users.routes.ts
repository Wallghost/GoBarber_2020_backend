import { Router } from 'express';
import multer from 'multer';
import multerConfig from '@config/uploadMulterConfig';

import ensureAuth from '@modules/users/infra/http/middleware/ensureAuthenticate';

import UsersControllers from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(multerConfig);
const usersController = new UsersControllers();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
