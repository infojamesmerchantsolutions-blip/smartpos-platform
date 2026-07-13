import { FastifyReply, FastifyRequest } from "fastify";

export async function requestLogger(
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.info({
    method: request.method,
    url: request.url,
    ip: request.ip
  });

  reply.header("X-Powered-By", "SmartPOS");
}
