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
  /* ==== TEMPLATE CALLS ==== */
  async getTemplates() {
    const response = await this.client.get('/templates')
    return response.data
  }

  async getTemplateById(templateType: string, templateId: number) {
    const response = await this.client.get(
      `/templates/${templateType}/get?templateId=${templateId}`
    )
    return response.data
  }

  async createTemplate(data: Record<string, any>) {
    const response = await this.client.post('/templates/email/upsert', data)
    return response.data
  }

  /* ==== MESSAGETYPES CALLS ==== */
  async getMessageTypes() {
    const response = await this.client.get('/messageTypes')
    return response.data
  }
}
