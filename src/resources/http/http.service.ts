import { Logger } from '@nestjs/common';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ServerError, MainAppError } from '../errors';

export class HttpService {
  protected axios: AxiosInstance;

  private logger: Logger;

  constructor(baseUrl: string) {
    this.axios = axios.create({ baseURL: baseUrl });
    this.logger = new Logger(HttpService.name);
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T | MainAppError> {
    return this.axios
      .get<T>(url, config)
      .then((r: AxiosResponse<T>) => r.data)
      .catch((t: AxiosError) => this.handleAxiosError(t));
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T | MainAppError> {
    return this.axios
      .post<T>(url, data, config)
      .then((r: AxiosResponse<T>) => r.data)
      .catch((t: AxiosError) => this.handleAxiosError(t));
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T | MainAppError> {
    return this.axios
      .put<T>(url, data, config)
      .then((r: AxiosResponse<T>) => r.data)
      .catch((t: AxiosError) => this.handleAxiosError(t));
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T | MainAppError> {
    return this.axios
      .patch<T>(url, data, config)
      .then((r: AxiosResponse<T>) => r.data)
      .catch((t: AxiosError) => this.handleAxiosError(t));
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T | MainAppError> {
    return this.axios
      .delete(url, config)
      .then((r: AxiosResponse<T>) => r.data)
      .catch((t: AxiosError) => this.handleAxiosError(t));
  }

  private handleAxiosError(error: AxiosError): MainAppError {
    if (error.response && error.response.data) {
      const err = new MainAppError();
      err.message = JSON.stringify(error.response.data) || error.message;
      err.statusCode = error.response.status;
      err.data = error.response.data;
      return err;
    }
    return new ServerError(error.message);
  }

  public request<T>(config: AxiosRequestConfig): Promise<T> {
    return axios
      .request<T>(config)
      .then((res) => res.data)
      .catch((t: AxiosError) => {
        throw this.handleAxiosError(t);
      });
  }

  public async fetch(config: AxiosRequestConfig<any>, options?) {
    if (options) {
      config = { headers: options.headers, url: config.toString() };
    }
    return axios(config);
  }
}
