import crypto from "crypto";

export function createRequestHash(

  payload: unknown

) {

  return crypto

    .createHash(

      "sha256"

    )

    .update(

      JSON.stringify(

        payload

      )

    )

    .digest(

      "hex"

    );

}
