# Chaos Courier
### Managing the chaos of multi-channel messaging 

## Overview
Chaos Courier is an npm package that provides a TypeScript-based client for interacting with the Iterable API. It enables seamless integration with Iterable's campaign, template, list, and messaging services, supporting both traditional Promise-based calls and RxJS-based Observable calls.

## Installation
To install Chaos Courier, run:
```sh
npm install chaos-courier
```

## Usage
Import the package and create an instance of `IterableClient`:

```typescript
import { IterableClient } from 'chaos-courier';

const client = new IterableClient({ apiKey: 'your_api_key_here' });
```

### Initialization
The `IterableClient` class requires an API key and an optional base URL:
```typescript
interface IterableOptions {
  apiKey: string;
  baseURL?: string; // Defaults to 'https://api.iterable.com/api'
}
```

## API Methods
All methods support both:
- **Promise-based** functions for traditional async/await usage.
- **Observable-based** functions for RxJS-based reactive programming.

### Template Calls
#### Get All Templates
```typescript
client.getTemplates(medium?: string): Promise<Template[]>;
client.getTemplates$(medium?: string): Observable<Template[]>;
```
Fetches a list of templates, optionally filtered by message medium.

#### Get Template By ID
```typescript
client.getTemplateById(templateType: string, templateId: number): Promise<Template>;
client.getTemplateById$(templateType: string, templateId: number): Observable<Template>;
```
Retrieves a template by its ID.

#### Create or Update a Template
```typescript
client.createTemplate(data: Record<string, any>): Promise<iterableCreateTemplateResponse>;
client.createTemplate$(data: Record<string, any>): Observable<iterableCreateTemplateResponse>;
```
Creates or updates an email template.

---
### Message Types Calls
#### Get Message Types
```typescript
client.getMessageTypes(): Promise<MessageType[]>;
client.getMessageTypes$(): Observable<MessageType[]>;
```
Retrieves all available message types.

---
### Campaign Calls
#### Get Campaign Metadata
```typescript
client.getCampaignsMetadata(): Promise<Campaign[]>;
client.getCampaignsMetadata$(): Observable<Campaign[]>;
```
Fetches metadata for all campaigns.

#### Get Campaign Metrics
```typescript
client.getCampaignMetrics(campaignId: number): Promise<string>;
client.getCampaignMetrics$(campaignId: number): Observable<string>;
```
Retrieves metrics for a specific campaign.

#### Create a Campaign
```typescript
client.createCampaign(data: iterableCreateCampaignBody): Promise<number>;
client.createCampaign$(data: iterableCreateCampaignBody): Observable<number>;
```
Creates a new campaign.

---
### List Calls
#### Get All Lists
```typescript
client.getLists(): Promise<List[]>;
client.getLists$(): Observable<List[]>;
```
Fetches all available lists.

#### Get List User Count
```typescript
client.getListUserCount(listId: number): Promise<number>;
client.getListUserCount$(listId: number): Observable<number>;
```
Retrieves the number of users in a given list.

## Error Handling
Errors returned by the Iterable API will be propagated through both promise-based and observable-based methods. Ensure to handle errors appropriately:
```typescript
try {
  const templates = await client.getTemplates();
} catch (error) {
  console.error('Error fetching templates:', error);
}
```
For Observables:
```typescript
client.getTemplates$().subscribe({
  next: (templates) => console.log(templates),
  error: (err) => console.error('Error:', err)
});
```

## License
This package is licensed under the MIT License.

