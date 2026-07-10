import {

  generateTransactionReference

} from "../../../src/utils/generate-reference";

describe(

  "Reference Generator",

  () => {

    it(

      "generates unique references",

      () => {

        const first =

          generateTransactionReference();

        const second =

          generateTransactionReference();

        expect(

          first

        ).not.toEqual(

          second

        );

      }

    );

    it(

      "starts with TXN",

      () => {

        const reference =

          generateTransactionReference();

        expect(

          reference.startsWith(

            "TXN"

          )

        ).toBe(

          true

        );

      }

    );

  }

);
