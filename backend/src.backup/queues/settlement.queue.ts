import { Job, Worker } from "bullmq";

import {

  BullConnection

} from "./bullmq.queue";

import SettlementService from "../services/settlement.service";

export default function createSettlementWorker(

  settlementService: SettlementService

) {

  return new Worker(

    "settlements",

    async (

      job: Job

    ) => {

      const {

        settlementId

      } = job.data;

      await settlementService.processSettlement(

        settlementId

      );

      await settlementService.completeSettlement(

        settlementId

      );

    },

    {

      connection:

        BullConnection

    }

  );

}
