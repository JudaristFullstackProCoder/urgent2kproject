import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: '../db/data.db',
        entities: ['/../**/*.entity{.ts,.js}'],
      });

      return dataSource.initialize();
    },
  },
];
