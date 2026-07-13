import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { FastifyInstance } from "fastify";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      id: string;
      merchantId?: string;
      email: string;
      role: string;
    };

    user: {
      id: string;
      merchantId?: string;
      email: string;
      role: string;
    };
  }
}

export default fp(async function (app: FastifyInstance) {
  await app.register(jwt, {
    secret: process.env.JWT_SECRET || "CHANGE_ME",

    sign: {
      expiresIn: process.env.JWT_EXPIRES_IN || "15m"
    }
  });

  app.decorate(
    "authenticate",
    async function (request: any, reply: any) {
      try {
        await request.jwtVerify();
      } catch (error) {
        return reply.code(401).send({
          success: false,
          message: "Unauthorized"
        });
      }
    }
  );
});
