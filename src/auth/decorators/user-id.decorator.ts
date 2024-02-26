import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const currentUserId = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user.id;
  },
);
