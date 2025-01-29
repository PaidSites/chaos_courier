export interface iterableApiResponse<T = any> {
  headers: Record<string, string>
  statusCode: number
  body?: T
}

/* ===== Templates ===== */
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

/* ===== MessageTypes ===== */
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

/* ===== Campaigns ===== */
export interface Campaign {
  id: number
  createdAt: number
  updatedAt: number
  name: string
  templateId: number
  messageMedium: string
  createdByUserId: string
  updatedByUserId: string
  campaignState: string
  workflowId: number
  labels: string[]
  type: string
}
export interface iterableCreateCampaignBody {
  name: string
  listIds: number[]
  templateId: number
  dataFields: Record<string, string>
}

export interface iterableCreateCampaignResponse extends iterableApiResponse {
  campaignId: number
}

export interface iterableCampaignMetricsResponse
  extends iterableApiResponse<string> {}

export interface iterableCampaignMedataResponse
  extends iterableApiResponse<Campaign[]> {}

/* ===== Lists ===== */
export interface List {
  id: number
  name: string
  description?: string
  createdAt: number
  listType: string
}

export interface iterableGetListsResponse extends iterableApiResponse<List[]> {}

export interface iterableListCountResponse
  extends iterableApiResponse<number> {}
