import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { IterableClient } from '../iterableClient'

describe('IterableClient', () => {
  const mock = new MockAdapter(axios)
  const apiKey = 'ITERABLE_API_KEY'
  const client = new IterableClient({ apiKey })

  afterEach(() => {
    mock.reset()
  })

  // test for getTemplates()
  it('should call the /templates endpoint on getTemplates', async () => {
    const mockResponse = {
      templates: [
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
      ],
    }
    mock
      .onGet('https://api.iterable.com/api/templates')
      .reply(200, mockResponse)

    const response = await client.getTemplates()

    expect(response).toEqual(mockResponse)
    expect(mock.history.get.length).toBe(1) // ensures get request was made
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
    expect(response).toEqual(mockResponse)
    expect(mock.history.get.length).toBe(1)
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

    mock
      .onPost('https://api.iterable.com/api/templates/email/upsert', mockData)
      .reply(200, mockResponse)

    const response = await client.createTemplate(mockData)
    expect(response).toEqual(mockResponse)
    expect(mock.history.post.length).toBe(1)
    expect(mock.history.post[0].url).toBe('/templates/email/upsert')
    expect(JSON.parse(mock.history.post[0].data)).toEqual(mockData) // Check the request body
    expect(mock.history.post[0].headers?.['Api-Key']).toBe(apiKey)
  })

  // test for getMessageTypes()
  it('should call /messageTypes endpoint on getMessageTypes', async () => {
    const mockResponse = {
      id: 123456,
      createdAt: 123456,
      updatedAt: 123456,
      name: 'coolname',
      channelId: 123456,
      subscriptionPolicy: 'subscription policy',
    }

    mock
      .onGet('https://api.iterable.com/api/messageTypes')
      .reply(200, mockResponse)

    const response = await client.getMessageTypes()
    expect(response).toEqual(mockResponse)
    expect(mock.history.get.length).toBe(1)
    expect(mock.history.get[0].url).toBe('/messageTypes')
    expect(mock.history.get[0].headers?.['Api-Key']).toBe(apiKey)
  })
})
