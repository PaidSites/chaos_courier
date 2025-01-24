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
})
