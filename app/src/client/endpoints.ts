import * as Resources from './resources';
import { RequestData, ResponseData } from '@kibalabs/core';


export class GetOwnersTokensRequest extends RequestData {
}

export class GetOwnersTokensResponse extends ResponseData {
  readonly token: Resources.Token[];

  public constructor(token: Resources.Token[]) {
    super();
    this.token = token;
  }

  public static fromObject = (obj: Record<string, unknown>): GetOwnersTokensResponse => {
    return new GetOwnersTokensResponse(
      (obj.tokens as Record<string, unknown>[]).map((innerObj: Record<string, unknown>) => Resources.Token.fromObject(innerObj)),
    );
  };
}

// export class GetOwnersTokensResponse extends ResponseData {
//   readonly token: Resources.Token;

//   public constructor(token: Resources.Token) {
//     super();
//     this.token = token;
//   }

//   public static fromObject = (obj: Record<string, unknown>): GetOwnersTokensResponse => {
//     return new GetOwnersTokensResponse(
//       Resources.Token.fromObject(obj.token as Record<string, unknown>),
//     );
//   };
// }