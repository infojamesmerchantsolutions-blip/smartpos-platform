import { FastifyReply, FastifyRequest } from "fastify";

export async function requireMerchant(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = request.user as any;

  if (!user?.merchantId) {
    return reply.status(403).send({
      success: false,
      message: "Merchant account required."
    });
  }
}
