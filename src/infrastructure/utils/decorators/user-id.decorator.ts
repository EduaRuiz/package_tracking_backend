import { ExecutionContext, Inject, createParamDecorator } from '@nestjs/common';
import { Http2ServerRequest } from 'http2';
import * as jwt from 'jsonwebtoken';

/**
 * User Id decorator class to get the user id from the request header authorization token payload id field
 *
 * @type {*}
 */
const UserId = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request: Http2ServerRequest = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    const decoded = jwt.decode(token);
    return decoded ? decoded['id'] : undefined;
  },
);

export default UserId;
