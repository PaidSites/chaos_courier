import axios, { AxiosInstance, AxiosResponse } from 'axios'
import {
  Campaign,
  iterableCreateCampaignBody,
  iterableCreateTemplateResponse,
  List,
  MessageType,
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
  ): Promise<Template> {
    const response: AxiosResponse<Template> = await this.client.get(
      `/templates/${templateType}/get?templateId=${templateId}`
    )
    return response.data
  }

  async createTemplate(
    data: Record<string, any>
  ): Promise<iterableCreateTemplateResponse> {
    const response: AxiosResponse<iterableCreateTemplateResponse> =
      await this.client.post('/templates/email/upsert', data)
    return response.data
  }

  /* ==== MESSAGETYPES CALLS ==== */
  async getMessageTypes(): Promise<MessageType[]> {
    const response: AxiosResponse<{ messageTypes: MessageType[] }> =
      await this.client.get('/messageTypes')
    return response.data.messageTypes
  }

  /* ==== CAMPAIGN CALLS ==== */
  async getCampaignsMetadata(): Promise<Campaign[]> {
    const response: AxiosResponse<{ campaigns: Campaign[] }> =
      await this.client.get('/campaigns')
    return response.data.campaigns
  }

  async getCampaignMetrics(campaignId: number): Promise<string> {
    const response: AxiosResponse<string> = await this.client.get(
      `/campaigns/metrics?campaignId=${campaignId}`
    )
    return response.data
  }

  async createCampaign(data: iterableCreateCampaignBody): Promise<number> {
    const response: AxiosResponse<number> = await this.client.post(
      '/campaigns/create',
      data
    )
    return response.data
  }

  /* ==== LIST CALLS ==== */
  async getLists(): Promise<List[]> {
    const response: AxiosResponse<{ lists: List[] }> = await this.client.get(
      '/lists'
    )
    return response.data.lists
  }

  async getListUserCount(listId: number): Promise<number> {
    const response: AxiosResponse<number> = await this.client.get(
      `/lists/${listId}/size`
    )
    return response.data
  }
}
