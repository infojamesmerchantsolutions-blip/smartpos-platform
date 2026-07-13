import { FastifyReply, FastifyRequest } from "fastify";

export async function requireAdmin(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = request.user as any;

  if (!user) {
    return reply.status(401).send({
      success: false,
      message: "Unauthorized."
    });
  }

  const allowed = [
    "SUPER_ADMIN",
    "PLATFORM_ADMIN"
  ];

  if (!allowed.includes(user.role)) {
    return reply.status(403).send({
      success: false,
      message: "Access denied."
    });
  }
}
