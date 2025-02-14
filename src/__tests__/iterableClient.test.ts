import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { IterableClient } from '../iterableClient'
import { async, firstValueFrom } from 'rxjs'

describe('IterableClient', () => {
  const mock = new MockAdapter(axios)
  const apiKey = 'ITERABLE_API_KEY'
  const client = new IterableClient({ apiKey })

  afterEach(() => {
    mock.reset()
  })

  // test for getTemplates()
  it('should call the /templates endpoint on getTemplates', async () => {
    const mockResponse = [
      {
        templateId: 12345678,
        createdAt: 1234567890123,
        updatedAt: 1234567890123,
        name: 'Template name',
        creatorUserId: 'someuser@test.com',
        messageTypeId: 123456,
      },
      {
        templateId: 12345678,
        createdAt: 1234567890123,
        updatedAt: 1234567890123,
        name: 'Template name 2',
        creatorUserId: 'someuser@test.com',
        messageTypeId: 123456,
      },
      {
        templateId: 12345678,
        createdAt: 1234567890123,
        updatedAt: 1234567890123,
        name: 'Template name 3',
        creatorUserId: 'someuser@test.com',
        messageTypeId: 123456,
      },
    ]

    mock
      .onGet('https://api.iterable.com/api/templates')
      .reply(200, { templates: mockResponse })

    // Axios / Promised based method
    const response = await client.getTemplates()
    // Observable based method
    const rxResponse = await firstValueFrom(client.getTemplates$())

    expect(rxResponse).toEqual(mockResponse)
    expect(response).toEqual(mockResponse)
    expect(mock.history.get.length).toBe(2) // ensures get request was made
    expect(mock.history.get[0].url).toBe('/templates') // checks the url
    expect(mock.history.get[0].headers?.['Api-Key']).toBe(apiKey) // checks the headers
  })

  // test for getTemplateById()
  it('should call the /templates/${templateType}/get?templateId=${templateId} endpoint on getTemplateById', async () => {
    const mockResponse = {
      templateId: 12345678,
      metadata: {
        templateId: 12345678,
        createdAt: 1234567890123,
        updatedAt: 1234567890123,
        name: 'Template Name',
        creatorUserId: 'user@example.com',
        messageTypeId: 123456,
        clientTemplateId: 'yothisisatemplateid6',
      },
      name: 'Template Name',
      fromName: 'My Email From Name',
      fromEmail: 'fromemail@example.com',
      subject: 'Email subject line',
      preheaderText: '',
      ccEmails: [],
      bccEmails: [],
      html: '<p>This is a great template! {{unsubscribeUrl}}</p>',
      plainText: '',
      dataFeedIds: [],
      cacheDataFeed: true,
      mergeDataFeedContext: false,
      clientTemplateId: 'yothisisatemplateid6',
      messageTypeId: 123456,
      creatorUserId: 'user@example.com',
    }
    const templateType = 'email'
    const templateId = 12345678

    mock
      .onGet(
        `https://api.iterable.com/api/templates/${templateType}/get?templateId=${templateId}`
      )
      .reply(200, mockResponse)

    const response = await client.getTemplateById(templateType, templateId)
    const rxResponse = await firstValueFrom(client.getTemplatebyId$(templateType, templateId))

    expect(response).toEqual(mockResponse)
    expect(rxResponse).toEqual(mockResponse)
    expect(mock.history.get.length).toBe(2)
    expect(mock.history.get[0].url).toBe(
      `/templates/${templateType}/get?templateId=${templateId}`
    )
    expect(mock.history.get[0].headers?.['Api-Key']).toBe(apiKey)
  })

  // test for createTemplate()
  it('should call the /templates/email/upsert endpoint on createTemplate', async () => {
    const mockResponse = {
      msg: 'Upserted 1 templates with IDs: 12345678',
      code: 'Success',
      params: null,
    }
    const mockData = {
      name: 'Cool Template Example',
      fromEmail: 'email@mb.example.com',
      fromName: 'Email From Name',
      subject: 'Email Name and Date',
      html: '<p>This is a great template! {{unsubscribeUrl}}</p>',
      clientTemplateId: 'yothisisatemplateid',
      messageTypeId: 123456,
      creatorUserId: 'test@example.com',
    }
    const templateType = 'email'

    mock
      .onPost('https://api.iterable.com/api/templates/email/upsert', mockData)
      .reply(200, mockResponse)

    const response = await client.createTemplate(mockData, templateType)
    const rxResponse = await firstValueFrom(client.createTemplate$(mockData, templateType))

    expect(response).toEqual(mockResponse)
    expect(rxResponse).toEqual(mockResponse)
    expect(mock.history.post.length).toBe(2)
    expect(mock.history.post[0].url).toBe('/templates/email/upsert')
    expect(JSON.parse(mock.history.post[0].data)).toEqual(mockData) // Check the request body
    expect(mock.history.post[0].headers?.['Api-Key']).toBe(apiKey)
  })

  // test for getMessageTypes()
  it('should call /messageTypes endpoint on getMessageTypes', async () => {
    const mockResponse = [
      {
        id: 123456,
        createdAt: 123456,
        updatedAt: 123456,
        name: 'coolname',
        channelId: 123456,
        subscriptionPolicy: 'subscription policy',
      },
      {
        id: 123456,
        createdAt: 123456,
        updatedAt: 123456,
        name: 'coolname',
        channelId: 123456,
        subscriptionPolicy: 'subscription policy',
      },
    ]

    mock
      .onGet('https://api.iterable.com/api/messageTypes')
      .reply(200, { messageTypes: mockResponse })

    const response = await client.getMessageTypes()
    const rxResponse = await firstValueFrom(client.getMessageTypes$())

    expect(response).toEqual(mockResponse)
    expect(rxResponse).toEqual(mockResponse)
    expect(mock.history.get.length).toBe(2)
    expect(mock.history.get[0].url).toBe('/messageTypes')
    expect(mock.history.get[0].headers?.['Api-Key']).toBe(apiKey)
  })

  // test for getCampaignsMetadata()
  it('should call /campaigns endpoint on getCampaignsMetadata', async () => {
    const mockResponse = [
      {
        id: 123456,
        createdAt: 123456,
        updatedAt: 123456,
        name: 'cool name',
        templateId: 123456,
        messageMedium: 'message Medium',
        createdByUserId: 'user ID',
        updatedByUserId: 'user ID',
        campaignState: 'state is here',
        workflowId: 123456,
        labels: ['label1', 'label2'],
        type: 'type here',
      },
      {
        id: 123456,
        createdAt: 123456,
        updatedAt: 123456,
        name: 'cool name',
        templateId: 123456,
        messageMedium: 'message Medium',
        createdByUserId: 'user ID',
        updatedByUserId: 'user ID',
        campaignState: 'state is here',
        workflowId: 123456,
        labels: ['label1', 'label2'],
        type: 'type here',
      },
    ]

    mock
      .onGet('https://api.iterable.com/api/campaigns')
      .reply(200, { campaigns: mockResponse })

    const response = await client.getCampaignsMetadata()
    const rxResponse = await firstValueFrom(client.getCampaignsMetadata$())

    expect(response).toEqual(mockResponse)
    expect(rxResponse).toEqual(mockResponse)
    expect(mock.history.get.length).toBe(2)
    expect(mock.history.get[0].url).toBe('/campaigns')
    expect(mock.history.get[0].headers?.['Api-Key']).toBe(apiKey)
  })

  // test for getCampaignMetrics()
  it('should call /campaigns/metrics?campaignId endpoint', async () => {
    const mockResponse =
      'this is a plaintext response that the endpoint sends back.'
    const campaignId = 123456

    mock
      .onGet(
        `https://api.iterable.com/api/campaigns/metrics?campaignId=${campaignId}`
      )
      .reply(200, mockResponse)

    const response = await client.getCampaignMetrics(campaignId)
    const rxResponse = await firstValueFrom(client.getCampaignMetrics$(campaignId))

    expect(response).toEqual(mockResponse)
    expect(rxResponse).toEqual(mockResponse)
    expect(mock.history.get.length).toBe(2)
    expect(mock.history.get[0].url).toBe(
      `/campaigns/metrics?campaignId=${campaignId}`
    )
    expect(mock.history.get[0].headers?.['Api-Key']).toBe(apiKey)
  })

  // test for createCampaign()
  it('should call /campaigns/create endpoint', async () => {
    const mockResponse = {
      campaignId: 123456,
    }
    const mockData = {
      name: 'cool campaign',
      listIds: [123, 124, 125],
      templateId: 987654,
      dataFields: {
        preheader: 'this is my preheader',
        headline: 'this is my headline',
        subject: 'this is my subjectline',
        content: '<p>content belongs in html tags!<p>',
      },
    }

    mock
      .onPost('https://api.iterable.com/api/campaigns/create', mockData)
      .reply(200, mockResponse)

    const response = await client.createCampaign(mockData)
    const rxResponse = await firstValueFrom(client.createCampaign$(mockData))

    expect(response).toEqual(mockResponse)
    expect(rxResponse).toEqual(mockResponse)
    expect(mock.history.post.length).toBe(2)
    expect(mock.history.post[0].url).toBe('/campaigns/create')
    expect(JSON.parse(mock.history.post[0].data)).toEqual(mockData)
    expect(mock.history.post[0].headers?.['Api-Key']).toBe(apiKey)
  })

  // test for getLists()
  it('should call /lists endpoint', async () => {
    const mockResponse = [
      {
        id: 123456,
        name: 'list name',
        description: 'description of list',
        createdAt: 456789,
        listType: 'list type is...',
      },
      {
        id: 987654,
        name: 'list name2',
        createdAt: 654321,
        listType: 'list type is...',
      },
    ]

    mock
      .onGet('https://api.iterable.com/api/lists')
      .reply(200, { lists: mockResponse })

    const response = await client.getLists()
    const rxResponse = await firstValueFrom(client.getLists$())

    expect(response).toEqual(mockResponse)
    expect(rxResponse).toEqual(mockResponse)
    expect(mock.history.get.length).toBe(2)
    expect(mock.history.get[0].url).toBe('/lists')
    expect(mock.history.get[0].headers?.['Api-Key']).toBe(apiKey)
  })

  // test for getUserListCount()
  it('should call /lists/${listId}/size endpoint', async () => {
    const mockResponse = 2
    const listId = 123456
    mock
      .onGet(`https://api.iterable.com/api/lists/${listId}/size`)
      .reply(200, mockResponse)

    const response = await client.getListUserCount(listId)
    const rxResponse = await firstValueFrom(client.getListUserCount$(listId))

    expect(response).toEqual(mockResponse)
    expect(rxResponse).toEqual(mockResponse)
    expect(mock.history.get.length).toBe(2)
    expect(mock.history.get[0].url).toBe(`/lists/${listId}/size`)
    expect(mock.history.get[0].headers?.['Api-Key']).toBe(apiKey)
  })

  // test for archiveCampaigns()
  it('should call /campaigns/archive endpoint', async () => {
    const mockResponse = {
      success: [123, 789],
      failed: [456]
    }
    const mockData = {
      campaignIds: [123, 456, 789]
    }
    mock.onPost('https://api.iterable.com/api/campaigns/archive', mockData).reply(200, mockResponse)

    const response = await client.archiveCampaigns(mockData)
    const rxResponse = await firstValueFrom(client.archiveCampaigns$(mockData))

    expect(response).toEqual(mockResponse)
    expect(rxResponse).toEqual(mockResponse)
    expect(mock.history.post.length).toBe(2)
    expect(mock.history.post[0].url).toBe('/campaigns/archive')
    expect(mock.history.post[0].headers?.['Api-Key']).toBe(apiKey)
  })

  // test for activateTriggeredCampaign()
  it('should call /campaigns/activateTriggered endpoint', async () => {
    const mockData = {
      campaignId: 123456
    }
    const mockRes = {
      msg: "Success! Fired campaign id: 123456",
      code: "Success",
      params: null
    }
    mock.onPost('https://api.iterable.com/api/campaigns/activateTriggered', mockData).reply(200, mockRes)

    const response = await client.activateTriggeredCampaign(mockData)
    const rxResponse = await firstValueFrom(client.activateTriggeredCampaign$(mockData))

    expect(response).toEqual(mockRes)
    expect(rxResponse).toEqual(mockRes)
    expect(mock.history.post.length).toBe(2)
    expect(mock.history.post[0].url).toBe('/campaigns/activateTriggered')
    expect(mock.history.post[0].headers?.['Api-Key']).toBe(apiKey)
  })

  // test for triggerCampaign()
  it('should call /campaigns/trigger endpoint', async () => {
    const mockData = {
      campaignId: 456789,
      listIds: [
        123456
      ],
      dataFields: {
        preheader: "This is a sample preheader!",
        headline: "New Headline for Testing! Wow!",
        subject: "This is a test subject line!",
        content: "<p>html in my content! yahoo!</p>",
        fromName: "Alex"
      }
    }
    const mockRes = {
      code: "Success",
      msg: "Good job!",
      params: null
    }
    mock.onPost('https://api.iterable.com/api/campaigns/trigger', mockData).reply(200, mockRes)

    const response = await client.triggerCampaign(mockData)
    const rxRes = await firstValueFrom(client.triggerCampaign$(mockData))

    expect(response).toEqual(mockRes)
    expect(rxRes).toEqual(mockRes)
    expect(mock.history.post.length).toBe(2)
    expect(mock.history.post[0].url).toBe('/campaigns/trigger')
    expect(mock.history.post[0].headers?.['Api-Key']).toBe(apiKey)
  })

  // test for deactivateTriggeredCampaign()
  it('should call /campaigns/deactivateTriggered endpoint', async () => {
    const mockData = {
      campaignId: 123456
    }
    const mockRes = {
      code: "Success",
      msg: "Yay! Good job",
      params: null
    }

    mock.onPost('https://api.iterable.com/api/campaigns/deactivateTriggered', mockData).reply(200, mockRes)

    const response = await client.deactivateTriggeredCampaign(mockData)
    const rxRes = await firstValueFrom(client.deactivateTriggeredCampaign$(mockData))

    expect(response).toEqual(mockRes)
    expect(rxRes).toEqual(mockRes)
    expect(mock.history.post.length).toBe(2)
    expect(mock.history.post[0].url).toBe('/campaigns/deactivateTriggered')
    expect(mock.history.post[0].headers?.['Api-Key']).toBe(apiKey)
  })

  // test for sendEmailToAddress()
  it('should call /email/target endpoint', async () => {
    const mockData = {
      campaignId: 123456,
      listIds: [456, 789],
      recipientEmail: "test@email.com",
      dataFields: {
        prehead: "This is a sample preheader!",
        headline: "This is the best headline.",
        subject: "This is a test subject line!",
        content: "<p>Need I say more???</p>",
        fromName: "Happy Guy"
      }
    }
    const mockRes = {
      code: "Success",
      msg: "Good job, email sent.",
      params: null
    }

    mock.onPost('https://api.iterable.com/api/email/target', mockData).reply(200, mockRes)

    const response = await client.sendEmailToAddress(mockData)
    const rxRes = await firstValueFrom(client.sendEmailToAddress$(mockData))

    expect(response).toEqual(mockRes)
    expect(rxRes).toEqual(mockRes)
    expect(mock.history.post.length).toBe(2)
    expect(mock.history.post[0].url).toBe('/email/target')
    expect(mock.history.post[0].headers?.['Api-Key']).toBe(apiKey)

  })
})
