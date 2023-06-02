import config, { IConfig } from 'config';
import dotenv  from 'dotenv';
import { connect as mongooseConnect, connection } from 'mongoose';

const dbConfig: IConfig = config.get('App.database');
dotenv.config();

export const connect = async (): Promise<void> => {
  console.log(process.env);
  await mongooseConnect(process.env.MONGOURL ?? dbConfig.get('mongoUrl'));
};

export const close = (): Promise<void> => connection.close();
