import {

  FastifyReply,

  FastifyRequest

} from "fastify";

export default function rateLimit(

  limit = 100,

  window = 60

) {

  return async (

    request: FastifyRequest,

    reply: FastifyReply

  ) => {

    const key =

      `rate:${request.ip}`;

    const redis =

      request.server.redis;

    const count =

      await redis.incr(

        key

      );

    if (

      count === 1

    ) {

      await redis.expire(

        key,

        window

      );

    }

    if (

      count > limit

    ) {

      return reply.status(

        429

      ).send({

        success: false,

        message:

          "Too many requests."

      });

    }

  };

}
