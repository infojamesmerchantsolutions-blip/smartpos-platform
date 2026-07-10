import { FastifyReply, FastifyRequest } from "fastify";

import BlockchainService from "../services/blockchain.service";

export default class BlockchainController {

  constructor(
    private readonly blockchainService: BlockchainService
  ) {}

  createTransaction = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const transaction =
      await this.blockchainService.createTransaction(
        request.body as any
      );

    return reply.code(201).send({

      success: true,

      data: transaction

    });

  };

  confirmTransaction = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const body =
      request.body as any;

    const confirmation =
      await this.blockchainService.addConfirmation({

        txId: body.txId,

        confirmations: body.confirmations,

        blockHash: body.blockHash,

        blockTime: body.blockTime,

        metadata: body.metadata

      });

    return reply.send({

      success: true,

      data: confirmation

    });

  };

  walletTransfer = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const transfer =
      await this.blockchainService.createWalletTransfer(
        request.body as any
      );

    return reply.code(201).send({

      success: true,

      data: transfer

    });

  };

  getTransaction = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const { id } =
      request.params as any;

    const transaction =
      await this.blockchainService.findTransaction(
        id
      );

    return reply.send({

      success: true,

      data: transaction

    });

  };

}
