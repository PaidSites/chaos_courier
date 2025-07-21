import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { Observable, from } from 'rxjs'
import {
  Campaign,
  cancelSMSBody,
  Channel,
  iterableCampaignResponse,
  iterableCreateCampaignBody,
  iterableDeleteTemplateResponse,
  iterableTemplateResponse,
  iterableTriggerCampaignBody,
  List,
  ListRemoveBody,
  ListResponse,
  ListSubBody,
  MessageType,
  sendEmailBody,
  sendSMSBody,
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
    const response: AxiosResponse<{ campaignId: number }> = await this.client.post(
      '/campaigns/create',
      data
    )
    return response.data.campaignId
  }
  // Observable based method
  createCampaign$ = (data: iterableCreateCampaignBody): Observable<number> => {
    return from(this.createCampaign(data))
  }

  async archiveCampaigns(data: Record<string, number[]>): Promise<Record<string, number[]>> {
    const response: AxiosResponse<Record<string, number[]>> = await this.client.post(
      '/campaigns/archive',
      data
    )
    return response.data
  }
  // Observable based method
  archiveCampaigns$ = (data: Record<string, number[]>): Observable<Record<string, number[]>> => {
    return from(this.archiveCampaigns(data))
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

  /* ==== CHANNEL CALL ==== */
  async getChannels(): Promise<Channel[]> {
    const response: AxiosResponse<{ channels: Channel[] }> = await this.client.get('/channels')
    return response.data.channels
  }
  getChannels$ = (): Observable<Channel[]> => {
    return from(this.getChannels())
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

  async createStaticList(data: Record<string, string>): Promise<number> {
    const response: AxiosResponse<{ listId: number }> = await this.client.post('/lists', data)
    return response.data.listId
  }
  // Observable based method
  createStaticList$ = (data: Record<string, string>): Observable<number> => {
    return from(this.createStaticList(data))
  }

  async subscribeToList(data: ListSubBody): Promise<ListResponse> {
    const response: AxiosResponse<ListResponse> = await this.client.post('/lists/subscribe', data)
    return response.data
  }
  // Observable based method
  subscribeToList$ = (data: ListSubBody): Observable<ListResponse> => {
    return from(this.subscribeToList(data))
  }

  async unsubUsersFromList(data: ListRemoveBody): Promise<ListResponse> {
    const response: AxiosResponse<ListResponse> = await this.client.post('/lists/unsubscribe', data)
    return response.data
  }
  // Observable based method
  unsubUsersFromList$ = (data: ListRemoveBody): Observable<ListResponse> => {
    return from(this.unsubUsersFromList(data))
  }

  async deleteList(listId: number): Promise<iterableCampaignResponse> {
    const response: AxiosResponse<iterableCampaignResponse> = await this.client.delete(`/lists/${listId}`)
    return response.data
  }
  // Observable based method
  deleteList$ = (listId: number): Observable<iterableCampaignResponse> => {
    return from(this.deleteList(listId))
  }

  /* ==== EMAIL CALL ==== */
  async sendEmailToAddress(data: sendEmailBody): Promise<iterableCampaignResponse> {
    const response: AxiosResponse<iterableCampaignResponse> = await this.client.post('/email/target', data)
    return response.data
  }
  // Observable based method
  sendEmailToAddress$ = (data: sendEmailBody): Observable<iterableCampaignResponse> => {
    return from(this.sendEmailToAddress(data))
  }

  /* ==== SMS CALLS ==== */
  async sendSMS(data: sendSMSBody): Promise<iterableCampaignResponse> {
    const response: AxiosResponse<iterableCampaignResponse> = await this.client.post('/sms/target', data)
    return response.data
  }

  sendSMS$ = (data: sendSMSBody): Observable<iterableCampaignResponse> => {
    return from(this.sendSMS(data))
  }

  async cancelSMS(data: cancelSMSBody): Promise<iterableCampaignResponse> {
    const response: AxiosResponse<iterableCampaignResponse> = await this.client.post('/sms/cancel', data)
    return response.data
  }

  cancelSMS$ = (data: cancelSMSBody): Observable<iterableCampaignResponse> => {
    return from(this.cancelSMS(data))
  }
}
