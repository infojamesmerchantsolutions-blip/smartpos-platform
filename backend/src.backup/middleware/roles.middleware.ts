import {
  FastifyReply,
  FastifyRequest
} from "fastify";

export function rolesMiddleware(

  roles: string[]

) {

  return async (

    request: FastifyRequest,

    reply: FastifyReply

  ) => {

    const user =
      request.user as any;

    if (!user) {

      return reply.status(401).send({

        success: false,

        message: "Unauthorized."

      });

    }

    if (

      !roles.includes(
        user.role
      )

    ) {

      return reply.status(403).send({

        success: false,

        message: "Forbidden."

      });

    }

  };

}
