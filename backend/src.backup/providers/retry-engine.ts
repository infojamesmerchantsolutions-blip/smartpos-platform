export interface RetryOptions {

  retries?: number;

  delay?: number;

}

export default class RetryEngine {

  async execute<T>(

    callback: () => Promise<T>,

    options?: RetryOptions

  ): Promise<T> {

    const retries =

      options?.retries ??

      3;

    const delay =

      options?.delay ??

      1000;

    let attempt = 0;

    let lastError: unknown;

    while (

      attempt < retries

    ) {

      try {

        return await callback();

      } catch (error) {

        lastError = error;

        attempt++;

        if (

          attempt < retries

        ) {

          await new Promise(

            resolve =>

              setTimeout(

                resolve,

                delay

              )

          );

        }

      }

    }

    throw lastError;

  }

}
