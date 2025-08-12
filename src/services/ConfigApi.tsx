import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string = 'https://crm-kana-experience-jet92.ondigitalocean.app/') {
  // constructor(baseURL: string = 'http://localhost:3000/') {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Método genérico para las peticiones
  private async request(method: string, url: string, data?: any): Promise<any> {
    const response: AxiosResponse<any> = await this.axiosInstance.request({
      method,
      url,
      data,
    });

    // Retorna toda la respuesta tal como la recibe
    return response.data;
  }

  // Métodos para GET, POST, PUT
  public get(path: string, params?: any): Promise<any> {
    const url = `/${path}`;
    return this.request('GET', url, params);
  }

  public post(path: string, data: any): Promise<any> {
    const url = `/${path}`;
    return this.request('POST', url, data);
  }

  public put(path: string, data: any): Promise<any> {
    const url = `/${path}`;
    return this.request('PUT', url, data);
  }
}

export default new ApiService();
