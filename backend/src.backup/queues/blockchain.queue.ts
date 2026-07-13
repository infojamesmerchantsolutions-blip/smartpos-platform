import { Job, Worker } from "bullmq";

import {

  BullConnection

} from "./bullmq.queue";

import BlockchainService from "../services/blockchain.service";

export default function createBlockchainWorker(

  blockchainService: BlockchainService

) {

  return new Worker(

    "blockchain",

    async (

      job: Job

    ) => {

      const {

        transactionId

      } = job.data;

      await blockchainService.syncTransaction(

        transactionId

      );

      await blockchainService.updateConfirmations(

        transactionId

      );

    },

    {

      connection:

        BullConnection

    }

  );

}
