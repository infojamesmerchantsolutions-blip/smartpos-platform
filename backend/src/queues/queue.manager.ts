import PaymentService from "../services/payment.service.js";
import SettlementService from "../services/settlement.service.js";
import BlockchainService from "../services/blockchain.service.js";
import WebhookService from "../services/webhook.service.js";

import createPaymentWorker from "./payment.queue.js";
import createSettlementWorker from "./settlement.queue.js";
import createBlockchainWorker from "./blockchain.queue.js";
import createWebhookWorker from "./webhook.queue.js";
import createNotificationWorker from "./notification.queue.js";

export default class QueueManager {

  constructor(

    private readonly paymentService: PaymentService,

    private readonly settlementService: SettlementService,

    private readonly blockchainService: BlockchainService,

    private readonly webhookService: WebhookService

  ) {}

  start() {

    createPaymentWorker(

      this.paymentService

    );

    createSettlementWorker(

      this.settlementService

    );

    createBlockchainWorker(

      this.blockchainService

    );

    createWebhookWorker(

      this.webhookService

    );

    createNotificationWorker();

  }

}
