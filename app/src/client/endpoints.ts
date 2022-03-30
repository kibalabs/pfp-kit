import { RequestData, ResponseData } from '@kibalabs/core';

import * as Resources from './resources';


export class GetOwnerTokensRequest extends RequestData {
}

export class GetOwnerTokensResponse extends ResponseData {
  readonly tokens: Resources.Token[];

  public constructor(token: Resources.Token[]) {
    super();
    this.tokens = token;
  }

  public static fromObject = (obj: Record<string, unknown>): GetOwnerTokensResponse => {
    return new GetOwnerTokensResponse(
      (obj.tokens as Record<string, unknown>[]).map((innerObj: Record<string, unknown>) => Resources.Token.fromObject(innerObj)),
    );
  };
}
