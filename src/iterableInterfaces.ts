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

/* ===== Channels ===== */
export interface Channel {
  channelType: string
  id: number
  messageMedium: string
  name: string
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
  templateId: number
  listIds?: number[]
  dataFields?: Record<string, string>
  suppressionListIds?: number[]
  sendMode?: string
  defaultTimeZone?: string
  startTimeZone?: string
}
export interface iterableCampaignResponse {
  msg: string
  code: string
  params: Record<string, any>
}
export interface iterableTriggerCampaignBody {
  campaignId: number
  listIds: number[]
  dataFields: Record<string, string>
  allowRepeatMarketingSends?: boolean
  suppressionListIds?: number[]
}

/* ===== Lists ===== */
export interface List {
  id: number
  name: string
  description?: string
  createdAt: number
  listType: string
}
export interface ListSubBody {
  listId: number
  subscribers: Record<string, any>[]
  updateExistingUsersOnly?: boolean
}
export interface ListRemoveBody {
  listId: number
  subscribers: Record<string, string>[]
  campaignId?: number
  channelUnsubscribe?: boolean
}
export interface ListResponse {
  createdFields: string[]
  failCount: number
  failedUpdates: Record<string, string>[]
  filteredOutFields: string[]
  invalidEmails: string[]
  invalidUserIds: string[]
  successCount: number
}

/* ===== Email ===== */
export interface sendEmailBody {
  allowRepeatMarketingSends?: boolean
  campaignId: number
  dataFields?: Record<string, string>
  recipientEmail?: string
  recipientUserId?: string
  sendAt?: string
}
