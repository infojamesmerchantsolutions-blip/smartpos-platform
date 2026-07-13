import { FastifyInstance } from "fastify";

export default class CacheService {

  constructor(

    private readonly app: FastifyInstance

  ) {}

  async get<T>(

    key: string

  ): Promise<T | null> {

    const value =

      await this.app.redis.get(

        key

      );

    if (

      !value

    ) {

      return null;

    }

    return JSON.parse(

      value

    );

  }

  async set(

    key: string,

    value: unknown,

    ttl = 300

  ) {

    await this.app.redis.set(

      key,

      JSON.stringify(

        value

      ),

      "EX",

      ttl

    );

  }

  async delete(

    key: string

  ) {

    await this.app.redis.del(

      key

    );

  }

  async exists(

    key: string

  ) {

    return (

      await this.app.redis.exists(

        key

      )

    ) === 1;

  }

  async increment(

    key: string

  ) {

    return this.app.redis.incr(

      key

    );

  }

  async expire(

    key: string,

    ttl: number

  ) {

    return this.app.redis.expire(

      key,

      ttl

    );

  }

}
