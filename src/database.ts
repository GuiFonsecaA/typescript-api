import config, { IConfig } from 'config';
import dotenv from 'dotenv';
import { connect as mongooseConnect, connection } from 'mongoose';
import logger from './logger';

const dbConfig: IConfig = config.get('App.database');
dotenv.config();

export const connect = async (): Promise<void> => {
  const uri = process.env.MONGOURL ?? dbConfig.get('mongoUrl');
  await mongooseConnect(uri as string);
  logger.info('DB running on instance: ' + uri);
};

export const close = (): Promise<void> => connection.close();
