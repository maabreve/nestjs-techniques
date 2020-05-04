export interface EnvironmentVariables {
  RDS_TYPE: 'postgres' | 'mysql' | 'mssql';
  RDS_HOSTNAME: string;
  RDS_DB_NAME: string;
  RDS_PORT: number;
  RDS_USERNAME: string;
  RDS_PASSWORD: string;
  PORT: string;
  MODE: 'DEV';
  RUN_MIGRATIONS: true;
  AUTH0_DOMAIN: string;
  AUTH0_AUDIENCE: string;
}
