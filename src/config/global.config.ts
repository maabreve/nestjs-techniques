import { TypeOrmModuleOptions } from "@nestjs/typeorm";
require('dotenv').config();

class EnvorinmentConfig {

  constructor(private env: { [k: string]: string | undefined }) {
  }

  getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  isProduction(): boolean {
    const mode = this.getValue('MODE');
    return mode != 'DEV';
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('RDS_HOSTNAME'),
      port: parseInt(this.getValue('RDS_PORT')),
      username: this.getValue('RDS_USERNAME'),
      password: this.getValue('RDS_PASSWORD'),
      database: this.getValue('RDS_DB_NAME'),
      entities: ['**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
      cli: {
        migrationsDir: 'src/migration',
      },
      // ssl: this.isProduction(),
    };
  }
};

const GlobalConfig = new EnvorinmentConfig(process.env);
export { GlobalConfig };