/* eslint-disable @typescript-eslint/ban-types */
import Koa from "koa";
import compose from "koa-compose";
import jwt from "koa-jwt";
import { PROTECTED_OP } from "../utils/constants";
import Response from "../utils/response";

const auth = () => {
  return async (ctx: Koa.Context, next: Function) => {
    try {
      if (
        ctx.request.body &&
        ctx.request.body.operationName &&
        PROTECTED_OP.includes(ctx.request.body.operationName)
      ) {
        if (!ctx.state.user || ctx.state.jwtOriginalError) {
          return Response.unauthorized(ctx, {
            code: 401,
            message: "Authentication Error",
          });
        }
      }
      await next();
    } catch (err) {
      return Response.unauthorized(ctx);
    }
  };
};

export const authMiddleware = (jwt_options: jwt.Options) =>
  compose([jwt(jwt_options), auth()]);

// Custom 401 handling
export const custom401 = () => {
  return async (ctx: Koa.Context, next: Function) => {
    await next().catch(
      (err: {
        status: number;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        originalError: { message: any };
        message: string;
      }) => {
        if (err.status === 401) {
          ctx.status = 401;
          const errMessage = err.originalError
            ? err.originalError.message
            : err.message;
          ctx.body = {
            error: errMessage,
          };
          ctx.set("X-Status-Reason", errMessage);
        } else {
          throw err;
        }
      }
    );
  };
};
