import { RequestData, ResponseData } from '@kibalabs/core';

import * as Resources from './resources';

export class GetOwnerTokensRequest extends RequestData {
}

export class GetOwnerTokensResponse extends ResponseData {
  readonly tokens: Resources.CollectionToken[];

  public constructor(token: Resources.CollectionToken[]) {
    super();
    this.tokens = token;
  }

  public static fromObject = (obj: Record<string, unknown>): GetOwnerTokensResponse => {
    return new GetOwnerTokensResponse(
      (obj.tokens as Record<string, unknown>[]).map((innerObj: Record<string, unknown>) => Resources.CollectionToken.fromObject(innerObj)),
    );
  };
}

export class RefreshAccountTokenOwnershipsRequest extends RequestData {
}

export class RefreshAccountTokenOwnershipsResponse extends ResponseData {
  // eslint-disable-next-line unused-imports/no-unused-vars
  public static fromObject = (obj: Record<string, unknown>): RefreshAccountTokenOwnershipsResponse => {
    return new RefreshAccountTokenOwnershipsResponse();
  };
}
