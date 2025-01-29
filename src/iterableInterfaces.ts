export interface iterableApiResponse<T = any> {
  headers: Record<string, string>
  statusCode: number
  body?: T
}

export interface Template {
  templateId: number
  metadata?: {
    templateId: number
    createdAt: number
    updatedAt: number
    name: string
    creatorUserId: string
    messageTypeId: number
    clientTemplateId: string
  }
  name: string
  fromName?: string
  fromEmail?: string
  subject?: string
  preheaderText?: string
  ccEmails?: string[]
  bccEmails?: string[]
  html?: string
  plainText?: string
  dataFeedIds?: number[]
  cacheDataFeed?: boolean
  mergeDataFeedContext?: boolean
  clientTemplateId?: string
  messageTypeId: number
  createdAt: number
  creatorUserId: string
}

export interface iterableTemplatesResponse
  extends iterableApiResponse<Template[]> {}

export interface iterableTemplateResponse
  extends iterableApiResponse<Template> {}

export interface iterableCreateTemplateResponse extends iterableApiResponse {
  msg: string
  code: string
  params?: string | null
}

export interface MessageType {
  id: number
  createdAt: number
  updatedAt: number
  name: string
  channelId: number
  subscriptionPolicy: string
}

export interface iterableMessageTypeResponse
  extends iterableApiResponse<MessageType> {}
