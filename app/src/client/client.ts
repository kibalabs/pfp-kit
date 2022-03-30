import { Requester, RestMethod, ServiceClient } from '@kibalabs/core';

import * as Endpoints from './endpoints';
import * as Resources from './resources';

export class NotdClient extends ServiceClient {
  public constructor(requester: Requester, baseUrl?: string) {
    super(requester, baseUrl || 'https://notd-api.kibalabs.com');
  }

  public getOwnerTokens = async (accountAddress: string): Promise<Resources.Token[]> => {
    const method = RestMethod.GET;
    const path = `v1/accounts/${accountAddress}/tokens`;
    const request = new Endpoints.GetOwnerTokensRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.GetOwnerTokensResponse);
    return response.tokens;
  };
}
