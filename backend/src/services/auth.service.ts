import { LoginInput } from "../schemas/auth.schema";
import { LoginResponse } from "../types/auth.types";

import { LoginInput, LoginResponse } from "../schemas/auth.schema";

export class AuthService {
  constructor(private readonly app: FastifyInstance) {}

  async login(data: LoginInput): Promise<LoginResponse> {
    const user = await this.app.prisma.user.findUnique({
      where: {
        email: data.email
      }
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordMatches = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!passwordMatches) {
      throw new Error("Invalid email or password");
    }

    const token = this.app.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return {
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    };
  }
}
