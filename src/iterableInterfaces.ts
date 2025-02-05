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

export interface iterableTemplateResponse {
  msg: string
  code: string
  params?: string | null
}

export interface iterableDeleteTemplateResponse {
  success: number[]
  failed: number[]
  failureReason: string
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

/* ===== Campaigns ===== */
export interface Campaign {
  id: number
  createdAt: number
  updatedAt: number
  startedAt?: number
  endedAt?: number
  name: string
  templateId: number
  messageMedium: string
  createdByUserId: string
  updatedByUserId: string
  campaignState: string
  workflowId: number
  labels: string[]
  type: string
  listIds?: number[]
}
export interface iterableCreateCampaignBody {
  name: string
  listIds: number[]
  templateId: number
  dataFields: Record<string, string>
}

/* ===== Lists ===== */
export interface List {
  id: number
  name: string
  description?: string
  createdAt: number
  listType: string
}
