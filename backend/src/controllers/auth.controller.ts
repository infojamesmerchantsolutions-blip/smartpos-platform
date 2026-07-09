import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";

import { loginSchema } from "../schemas/auth.schema";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService: AuthService;

  constructor(app: FastifyInstance) {
    this.authService = new AuthService(app);
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = loginSchema.parse(request.body);

      const result = await this.authService.login(data);

      return reply.send(result);
    } catch (error: any) {
      return reply.code(401).send({
        success: false,
        message: error.message ?? "Authentication failed"
      });
    }
  }
}
