import axios, { AxiosInstance } from 'axios'

interface IterableOptions {
  apiKey: string
  baseURL?: string
}

export class IterableClient {
  private client: AxiosInstance

  constructor(options: IterableOptions) {
    this.client = axios.create({
      baseURL: options.baseURL || 'https://api.iterable.com/api',
      headers: { 'Api-Key': options.apiKey },
    })
  }

  async getTemplates() {
    const response = await this.client.get('/templates')
    return response.data
  }
}
