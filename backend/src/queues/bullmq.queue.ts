import { Queue } from "bullmq";
import IORedis from "ioredis";

import env from "../config/env";

const connection = new IORedis(

  env.REDIS_URL,

  {

    maxRetriesPerRequest: null,

    enableReadyCheck: false

  }

);

export const BullConnection =
  connection;

export const PaymentQueue =
  new Queue(

    "payments",

    {

      connection

    }

  );

export const SettlementQueue =
  new Queue(

    "settlements",

    {

      connection

    }

  );

export const WebhookQueue =
  new Queue(

    "webhooks",

    {

      connection

    }

  );

export const BlockchainQueue =
  new Queue(

    "blockchain",

    {

      connection

    }

  );

export const NotificationQueue =
  new Queue(

    "notifications",

    {

      connection

    }

  );
