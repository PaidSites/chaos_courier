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
  name?: string
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
  messageTypeId?: number
  createdAt?: number
  creatorUserId?: string
  message?: string
}

export interface IterableTemplateResponse {
  msg: string
  code: string
  params?: string | null
}

export interface IterableDeleteTemplateResponse {
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
export interface IterableCreateCampaignBody {
  name: string
  templateId: number
  listIds?: number[]
  dataFields?: Record<string, any>
  suppressionListIds?: number[]
  sendMode?: string
  sendAt?: string
  defaultTimeZone?: string
  startTimeZone?: string
}
export interface IterableCampaignResponse {
  msg: string
  code: string
  params: Record<string, any>
}
export interface IterableTriggerCampaignBody {
  campaignId: number
  listIds: number[]
  dataFields?: Record<string, any>
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
export interface SendEmailBody {
  allowRepeatMarketingSends?: boolean
  campaignId: number
  dataFields?: Record<string, any>
  recipientEmail?: string
  recipientUserId?: string
  sendAt?: string
}

/* ===== SMS ===== */
export interface SendSMSBody {
  allowRepeatMarketingSends?: boolean,
  campaignId: number,
  dataFields?: Record<string, any>,
  recipientEmail?: string,
  recipientUserId?: string,
  sendAt?: string
}

export interface CancelSMSBody {
  campaignId?: number,
  email?: string,
  scheduledMessageId?: number,
  userId?: string
}

/* ===== Native Push ===== */
export interface Action {
  data?: string;
  type?: string;
}

export interface ActionIcon {
  iconType?: Record<string, unknown>;
  imageName?: string;
}

export interface Button {
  action?: Action;
  actionIcon?: ActionIcon;
  buttonType?: string; // e.g. "default"
  identifier?: string;
  inputPlaceholder?: string;
  inputTitle?: string;
  openApp?: boolean;
  requiresUnlock?: boolean;
  title?: string;
}

export interface DeepLink {
  android?: string;
  ios?: string;
}

export interface RichMedia {
  android?: string;
  ios?: string;
}

export interface PushTemplate {
  badge?: string;
  buttons?: Button[];
  cacheDataFeed?: boolean;
  campaignDataFields?: Record<string, unknown>;
  campaignId?: number | string | Record<string, unknown>;
  clientTemplateId?: string;
  createdAt?: string; // ISO timestamp
  dataFeedIds?: number[];
  deeplink?: DeepLink;
  interruptionLevel?: string;
  isDefaultLocale?: boolean;
  isSilentPush?: boolean;
  locale?: string;
  mergeDataFeedContext?: boolean;
  message?: string;
  messageTypeId?: number;
  name?: string;
  payload?: Record<string, unknown>;
  relevanceScore?: number;
  richMedia?: RichMedia;
  sound?: string;
  templateId: number; // required
  title?: string;
  updatedAt?: string; // ISO timestamp
  wake?: boolean;
}

