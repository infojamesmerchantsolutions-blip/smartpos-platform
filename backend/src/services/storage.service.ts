import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand
} from "@aws-sdk/client-s3";

import env from "../config/env.js";

export interface UploadOptions {

  key: string;

  body: Buffer;

  contentType: string;

}

export default class StorageService {

  private readonly client = new S3Client({

    region: env.AWS_REGION,

    credentials: {

      accessKeyId: env.AWS_ACCESS_KEY,

      secretAccessKey: env.AWS_SECRET_KEY

    }

  });

  async upload(

    options: UploadOptions

  ) {

    await this.client.send(

      new PutObjectCommand({

        Bucket: env.S3_BUCKET,

        Key: options.key,

        Body: options.body,

        ContentType: options.contentType

      })

    );

    return {

      key: options.key,

      url: `https://${env.S3_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${options.key}`

    };

  }

  async delete(

    key: string

  ) {

    await this.client.send(

      new DeleteObjectCommand({

        Bucket: env.S3_BUCKET,

        Key: key

      })

    );

  }

  async download(

    key: string

  ) {

    return this.client.send(

      new GetObjectCommand({

        Bucket: env.S3_BUCKET,

        Key: key

      })

    );

  }

}
