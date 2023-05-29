import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

// https://stackoverflow.com/a/62730307
export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    console.log("currnetUser")
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req.user;
  },
);
