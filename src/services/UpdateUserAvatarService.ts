import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/Users';

import AppError from '../errors/AppError';

import uploadConfig from '../config/uploadMulterConfig';

interface Request {
  user_id: string;
  avatar: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatar }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatar;
    await usersRepository.save(user);

    return user;
  }
}
