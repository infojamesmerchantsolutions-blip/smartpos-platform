import pino from "pino";

const logger = pino({

  level:

    process.env.LOG_LEVEL ||

    "info",

  transport:

    process.env.NODE_ENV ===

    "development"

      ? {

          target:

            "pino-pretty",

          options: {

            colorize: true,

            translateTime: true,

            ignore:

              "pid,hostname"

          }

        }

      : undefined

});

export default logger;

export function logInfo(

  message: string,

  data?: unknown

) {

  logger.info(

    data,

    message

  );

}

export function logWarn(

  message: string,

  data?: unknown

) {

  logger.warn(

    data,

    message

  );

}

export function logError(

  message: string,

  error?: unknown

) {

  logger.error(

    error,

    message

  );

}

export function logDebug(

  message: string,

  data?: unknown

) {

  logger.debug(

    data,

    message

  );

}
