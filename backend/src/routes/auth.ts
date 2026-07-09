import { FastifyInstance } from "fastify";
import { z } from "zod";

import { hashPassword, verifyPassword } from "../utils/hash";
import { signAccessToken } from "../utils/jwt";
import { BadRequestError, UnauthorizedError } from "../utils/error";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export default async function authRoutes(app: FastifyInstance) {
  app.post("/api/v1/auth/register", async (request, reply) => {
    const body = registerSchema.parse(request.body);

    const existingUser = await app.prisma.user.findUnique({
      where: {
        email: body.email
      }
    });

    if (existingUser) {
      throw new BadRequestError("Email already exists");
    }

    const password = await hashPassword(body.password);

    const user = await app.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password,
        role: "ADMIN"
      }
    });

    const token = signAccessToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return reply.status(201).send({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  });

  app.post("/api/v1/auth/login", async (request) => {
    const body = loginSchema.parse(request.body);

    const user = await app.prisma.user.findUnique({
      where: {
        email: body.email
      }
    });

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const validPassword = await verifyPassword(
      body.password,
      user.password
    );

    if (!validPassword) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const token = signAccessToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return {
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  });
}
