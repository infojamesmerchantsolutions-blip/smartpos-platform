import {

  FastifyReply,

  FastifyRequest

} from "fastify";

export async function idempotencyMiddleware(

  request: FastifyRequest,

  reply: FastifyReply

) {

  const key =

    request.headers[

      "idempotency-key"

    ];

  if (

    !key

  ) {

    return;

  }

  request.idempotencyKey =

    String(

      key

    );

}
