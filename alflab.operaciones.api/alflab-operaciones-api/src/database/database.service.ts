import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

type QueryParam = string | number | boolean | null | Date;

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: mysql.Pool;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.pool = mysql.createPool({
      host:     this.configService.get<string>('DB_HOST'),
      port:     this.configService.get<number>('DB_PORT'),
      user:     this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      waitForConnections: true,
      connectionLimit:    10,
    });
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  async query<T extends RowDataPacket>(
    sql: string,
    params?: QueryParam[],
  ): Promise<T[]> {
    const [rows] = await this.pool.execute<T[]>(sql, params);
    return rows;
  }

  async queryOne<T extends RowDataPacket>(
    sql: string,
    params?: QueryParam[],
  ): Promise<T | null> {
    const rows = await this.query<T>(sql, params);
    return rows[0] ?? null;
  }

  async execute(
    sql: string,
    params?: QueryParam[],
  ): Promise<ResultSetHeader> {
    const [result] = await this.pool.execute<ResultSetHeader>(sql, params);
    return result;
  }
}