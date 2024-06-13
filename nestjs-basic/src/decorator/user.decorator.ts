import { createParamDecorator, ExecutionContext } from '@nestjs/common';


// Lấy thông tin user từ request
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);