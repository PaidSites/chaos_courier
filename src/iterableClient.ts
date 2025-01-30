import axios, { AxiosInstance, AxiosResponse } from 'axios'
import {
  iterableCampaignMedataResponse,
  iterableCampaignMetricsResponse,
  iterableCreateCampaignBody,
  iterableCreateTemplateResponse,
  iterableGetListsResponse,
  iterableListCountResponse,
  iterableMessageTypeResponse,
  iterableTemplateResponse,
  iterableTemplatesResponse,
  Template,
} from './iterableInterfaces'

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
  async getTemplates(medium?: string): Promise<Template[]> {
    const response: AxiosResponse<{ templates: Template[] }> = medium
      ? await this.client.get(`/templates?messageMedium=${medium}`)
      : await this.client.get('/templates')
    return response.data.templates
  }

  async getTemplateById(
    templateType: string,
    templateId: number
  ): Promise<iterableTemplateResponse> {
    const response = await this.client.get(
      `/templates/${templateType}/get?templateId=${templateId}`
    )
    return response.data
  }

  async createTemplate(
    data: Record<string, any>
  ): Promise<iterableCreateTemplateResponse> {
    const response = await this.client.post('/templates/email/upsert', data)
    return response.data
  }

  /* ==== MESSAGETYPES CALLS ==== */
  async getMessageTypes(): Promise<iterableMessageTypeResponse> {
    const response = await this.client.get('/messageTypes')
    return response.data
  }

  /* ==== CAMPAIGN CALLS ==== */
  async getCampaignsMetadata(): Promise<iterableCampaignMedataResponse> {
    const response = await this.client.get('/campaigns')
    return response.data
  }

  async getCampaignMetrics(
    campaignId: number
  ): Promise<iterableCampaignMetricsResponse> {
    const response = await this.client.get(
      `/campaigns/metrics?campaignId=${campaignId}`
    )
    return response.data
  }

  async createCampaign(data: iterableCreateCampaignBody) {
    const response = await this.client.post('/campaigns/create', data)
    return response.data
  }

  /* ==== LIST CALLS ==== */
  async getLists(): Promise<iterableGetListsResponse> {
    const response = await this.client.get('/lists')
    return response.data
  }

  async getListUserCount(listId: number): Promise<iterableListCountResponse> {
    const response = await this.client.get(`/lists/${listId}/size`)
    return response.data
  }
}
