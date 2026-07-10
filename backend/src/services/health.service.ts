import { FastifyInstance } from "fastify";

export default class HealthService {

  constructor(

    private readonly app: FastifyInstance

  ) {}

  async status() {

    await this.app.prisma.$queryRaw`SELECT 1`;

    const redis =

      await this.app.redis.ping();

    return {

      status:

        "healthy",

      timestamp:

        new Date(),

      database:

        "connected",

      redis,

      uptime:

        process.uptime(),

      memory:

        process.memoryUsage(),

      node:

        process.version

    };

  }

}
