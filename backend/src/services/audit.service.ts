import { FastifyInstance } from "fastify";

export interface AuditLogInput {

  merchantId?: string;

  userId?: string;

  transactionId?: string;

  action: string;

  resource: string;

  ipAddress?: string;

  userAgent?: string;

  metadata?: Record<string, any>;

}

export default class AuditService {

  constructor(

    private readonly app: FastifyInstance

  ) {}

  async log(

    input: AuditLogInput

  ) {

    return this.app.prisma.auditLog.create({

      data: {

        merchantId:

          input.merchantId,

        userId:

          input.userId,

        transactionId:

          input.transactionId,

        action:

          input.action,

        resource:

          input.resource,

        ipAddress:

          input.ipAddress,

        userAgent:

          input.userAgent,

        metadata:

          input.metadata

      }

    });

  }

}
