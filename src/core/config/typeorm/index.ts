import { UserEntity } from 'src/app/email/entity';
import { ConnectionOptions } from 'typeorm';
import { ENVIRONMENT, DATABASE_URL } from '../../environment';

const config: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  url: DATABASE_URL,
  entities: [UserEntity],
  logging: ENVIRONMENT === 'localhost',
  synchronize: true,
  migrationsRun: false,
};

export = config;
