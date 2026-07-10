import "@fastify/jwt";
import "fastify";
import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";

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

declare module "fastify" {

  interface FastifyInstance {

    prisma: PrismaClient;

    redis: Redis;

    authenticate: any;

  }

}
