import {
  FastifyReply,
  FastifyRequest
} from "fastify";

import AuthService from "../services/auth.service.js";

export default class AuthController {

  constructor(

    private readonly authService: AuthService

  ) {}

  login = async (

    request: FastifyRequest,

    reply: FastifyReply

  ) => {

    const body =
      request.body as any;

    const result =
      await this.authService.login(

        body.email,

        body.password

      );

    return reply.send({

      success: true,

      data: result

    });

  };

  me = async (

    request: FastifyRequest,

    reply: FastifyReply

  ) => {

    const user =
      request.user as any;

    const profile =
      await this.authService.me(

        user.id

      );

    return reply.send({

      success: true,

      data: profile

    });

  };

}
