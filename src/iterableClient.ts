import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { Observable, from } from 'rxjs'
import {
  Campaign,
  iterableCampaignResponse,
  iterableCreateCampaignBody,
  iterableDeleteTemplateResponse,
  iterableTemplateResponse,
  iterableTriggerCampaignBody,
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

  /* ==== TEMPLATE CALLS ==== */
  async getTemplates(medium?: string): Promise<Template[]> {
    const response: AxiosResponse<{ templates: Template[] }> = medium
      ? await this.client.get(`/templates?messageMedium=${medium}`)
      : await this.client.get('/templates')
    return response.data.templates
  }
  // Observable based method
  getTemplates$ = (medium?: string): Observable<Template[]> => {
    return from(this.getTemplates(medium))
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
  // Observable based method
  getTemplatebyId$ = (
    templateType: string,
    templateId: number
  ): Observable<Template> => {
    return from(this.getTemplateById(templateType, templateId))
  }

  async createTemplate(
    data: Record<string, any>,
    templateType: string
  ): Promise<iterableTemplateResponse> {
    const response: AxiosResponse<iterableTemplateResponse> =
      await this.client.post(`/templates/${templateType}/upsert`, data)
    return response.data
  }
  // Obervable based method
  createTemplate$ = (
    data: Record<string, any>,
    templateType: string
  ): Observable<iterableTemplateResponse> => {
    return from(this.createTemplate(data, templateType))
  }

  async updateTemplate(
    data: Template,
    templateType: string
  ): Promise<iterableTemplateResponse> {
    const response: AxiosResponse<iterableTemplateResponse> =
      await this.client.post(`/templates/${templateType}/update`, data)
    return response.data
  }
  // Observable based method
  updateTemplate$ = (
    data: Template,
    templateType: string
  ): Observable<iterableTemplateResponse> => {
    return from(this.updateTemplate(data, templateType))
  }

  async deleteTemplate(data: number[]) {
    const constructedData = {
      ids: data,
    }
    const response: AxiosResponse<iterableDeleteTemplateResponse> =
      await this.client.post('/templates/bulkDelete', constructedData)
    return response.data
  }
  // Observable based method
  deleteTemplate$ = (
    data: number[]
  ): Observable<iterableDeleteTemplateResponse> => {
    return from(this.deleteTemplate(data))
  }

  /* ==== MESSAGETYPES CALLS ==== */
  async getMessageTypes(): Promise<MessageType[]> {
    const response: AxiosResponse<{ messageTypes: MessageType[] }> =
      await this.client.get('/messageTypes')
    return response.data.messageTypes
  }
  // Obervable based method
  getMessageTypes$ = (): Observable<MessageType[]> => {
    return from(this.getMessageTypes())
  }

  /* ==== CAMPAIGN CALLS ==== */
  async getCampaignsMetadata(): Promise<Campaign[]> {
    const response: AxiosResponse<{ campaigns: Campaign[] }> =
      await this.client.get('/campaigns')
    return response.data.campaigns
  }
  // Observable based method
  getCampaignsMetadata$ = (): Observable<Campaign[]> => {
    return from(this.getCampaignsMetadata())
  }

  async getCampaignMetrics(campaignId: number): Promise<string> {
    const response: AxiosResponse<string> = await this.client.get(
      `/campaigns/metrics?campaignId=${campaignId}`
    )
    return response.data
  }
  // Observable based method
  getCampaignMetrics$ = (campaignId: number): Observable<string> => {
    return from(this.getCampaignMetrics(campaignId))
  }

  async createCampaign(data: iterableCreateCampaignBody): Promise<number> {
    const response: AxiosResponse<number> = await this.client.post(
      '/campaigns/create',
      data
    )
    return response.data
  }
  // Observable based method
  createCampaign$ = (data: iterableCreateCampaignBody): Observable<number> => {
    return from(this.createCampaign(data))
  }

  async archiveCampaign(data: Record<string, number[]>): Promise<Record<string, number[]>> {
    const response: AxiosResponse<Record<string, number[]>> = await this.client.post(
      '/campaigns/archive',
      data
    )
    return response.data
  }
  // Observable based method
  archiveCampaign$ = (data: Record<string, number[]>): Observable<Record<string, number[]>> => {
    return from(this.archiveCampaign(data))
  }

  async activateTriggeredCampaign(data: Record<string, number>): Promise<iterableCampaignResponse> {
    const response: AxiosResponse<iterableCampaignResponse> = await this.client.post('/campaigns/activateTriggered', data)
    return response.data
  }
  // Observable based method
  activateTriggeredCampaign$ = (data: Record<string, number>): Observable<iterableCampaignResponse> => {
    return from(this.activateTriggeredCampaign(data))
  }

  async triggerCampaign(data: iterableTriggerCampaignBody): Promise<iterableCampaignResponse> {
    const response: AxiosResponse<iterableCampaignResponse> = await this.client.post('/campaigns/trigger', data)
    return response.data
  }
  triggerCampaign$ = (data: iterableTriggerCampaignBody): Observable<iterableCampaignResponse> => {
    return from(this.triggerCampaign(data))
  }

  async deactivateTriggeredCampaign(data: Record<string, number>): Promise<iterableCampaignResponse> {
    const response: AxiosResponse<iterableCampaignResponse> = await this.client.post('/campaigns/deactivateTriggered', data)
    return response.data
  }
  // Observable based method
  deactivateTriggeredCampaign$ = (data: Record<string, number>): Observable<iterableCampaignResponse> => {
    return from(this.deactivateTriggeredCampaign(data))
  }

  /* ==== LIST CALLS ==== */
  async getLists(): Promise<List[]> {
    const response: AxiosResponse<{ lists: List[] }> = await this.client.get(
      '/lists'
    )
    return response.data.lists
  }
  // Observable based method
  getLists$ = (): Observable<List[]> => {
    return from(this.getLists())
  }

  async getListUserCount(listId: number): Promise<number> {
    const response: AxiosResponse<number> = await this.client.get(
      `/lists/${listId}/size`
    )
    return response.data
  }
  // Observable based method
  getListUserCount$ = (listId: number): Observable<number> => {
    return from(this.getListUserCount(listId))
  }
}
