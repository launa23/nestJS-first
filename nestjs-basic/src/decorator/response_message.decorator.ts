import { SetMetadata } from '@nestjs/common';

export const RESPONSE_MESSAGE = "Response message"
export const ResponseMessage = (message: string) =>
  SetMetadata(RESPONSE_MESSAGE, message);