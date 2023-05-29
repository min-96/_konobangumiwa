import { Catch, ArgumentsHost } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { CustomException } from './customException';
import { ApolloError } from 'apollo-server-express';

@Catch(CustomException)
export class CustomExceptionFilter implements GqlExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    let status = exception.getErrorCode() || 500;

    return new ApolloError(exception.message, String(status));
  }
}
