import PaymentService from "../services/payment.service";
import SettlementService from "../services/settlement.service";
import BlockchainService from "../services/blockchain.service";
import WebhookService from "../services/webhook.service";

import createPaymentWorker from "./payment.queue";
import createSettlementWorker from "./settlement.queue";
import createBlockchainWorker from "./blockchain.queue";
import createWebhookWorker from "./webhook.queue";
import createNotificationWorker from "./notification.queue";

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
