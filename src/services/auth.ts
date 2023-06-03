import { User } from '@src/models/user';
import bcrypt from 'bcrypt';
import config, { IConfig } from 'config';
import jwt from 'jsonwebtoken';

const authConfig: IConfig = config.get('App.auth');

export interface DecodedUser extends Omit<User, '_id'> {
  id: string;
}

export default class AuthService {
  public static async hashPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  public static generateToken(payload: object): string {
    return jwt.sign(payload, `${authConfig.get('key')}`, {
      expiresIn: authConfig.get('tokenExpiresIn'),
    });
  }

  public static decodeToken(token: string): DecodedUser {
    return jwt.verify(token, `${authConfig.get('key')}`) as DecodedUser;
  }
}
