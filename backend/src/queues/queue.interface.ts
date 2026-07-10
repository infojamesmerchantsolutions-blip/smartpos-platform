export interface QueueJob<T = any> {

  id: string;

  name: string;

  payload: T;

  attempts: number;

  createdAt: Date;

}

export interface QueueDriver {

  add<T>(

    name: string,

    payload: T

  ): Promise<void>;

  remove(

    id: string

  ): Promise<void>;

  process(

    name: string,

    handler: (

      job: QueueJob

    ) => Promise<void>

  ): Promise<void>;

}
