import { HttpException, Injectable } from '@nestjs/common';
import axios, { AxiosResponse, CanceledError } from 'axios';

@Injectable()
export class HttpService {

  async get<T>(url: string, config?: Record<string, any>): Promise<AxiosResponse<T>> {
    try {
      return await axios.get<T>(url, config);
    } catch (error) {
      throw new HttpException(error.response, error.response.status);
    }
  }

  async post<T, U>(url: string, data: U, config?: Record<string, any>): Promise<AxiosResponse<T>> {
    try {
      return await axios.post<T>(url, data, config);
    } catch (error) {
      throw new HttpException(error.response, error.response.status);
    }
  }

  async delete<T>(url: string, config?: Record<string, any>): Promise<AxiosResponse<T>> {
    try {
      return await axios.delete<T>(url, config);
    } catch (error) {
      throw new HttpException(error.response, error.response.status);
    }
  }

  async patch<T, U>(url: string, data: U, config?: Record<string, any>): Promise<AxiosResponse<T>> {
    try {
      return await axios.patch<T>(url, data, config);
    } catch (error) {
      throw new HttpException(error.response, error.response.status);
    }
  }

  async head<T>(url: string, config?: Record<string, any>): Promise<AxiosResponse<T>> {
    try {
      return await axios.head<T>(url, config);
    } catch (error: any) {
      if (error instanceof CanceledError) {
        throw error;
      }
      throw new HttpException(error.response, error.response.status);
    }
  }
}