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
  // TODO:
  // - implement rxjs observable
  // - add types to function calls

  /* ==== TEMPLATE CALLS ==== */
  // TODO: implement ?messageMedium=${medium} as a optional parameter
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

  /* ==== CAMPAIGN CALLS ==== */
  async getCampaignsMetadata() {
    const response = await this.client.get('/campaigns')
    return response.data
  }

  async getCampaignMetrics(campaignId: number) {
    const response = await this.client.get(
      `/campaigns/metrics?campaignId=${campaignId}`
    )
    return response.data
  }

  async createCampaign(data: Record<string, any>) {
    const response = await this.client.post('/campaigns/create', data)
    return response.data
  }

  /* ==== LIST CALLS ==== */
  async getLists() {
    const response = await this.client.get('/lists')
    return response.data
  }

  async getListUserCount(listId: number) {
    const response = await this.client.get(`/lists/${listId}/size`)
    return response.data
  }
}
