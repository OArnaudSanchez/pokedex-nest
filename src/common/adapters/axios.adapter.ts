import { Injectable } from '@nestjs/common';
import { IHttpClientAdapter } from '../interfaces/http-client-adapter.interface';
import axios, { AxiosStatic } from 'axios';

@Injectable()
export class AxiosAdapter implements IHttpClientAdapter {
  private readonly axios: AxiosStatic = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error(`Error occured in the request ${error}`);
    }
  }
}
