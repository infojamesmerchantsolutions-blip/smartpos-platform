import cron from "node-cron";

export default class SchedulerService {

  register(

    expression: string,

    task: () => Promise<void> | void

  ) {

    cron.schedule(

      expression,

      async () => {

        try {

          await task();

        } catch (error) {

          console.error(

            "Scheduled task failed:",

            error

          );

        }

      }

    );

  }

}
