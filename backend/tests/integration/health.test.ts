import request from "supertest";

import app from "../../src/app";

describe(

  "Health Endpoint",

  () => {

    it(

      "returns 200",

      async () => {

        const response =

          await request(app.server)

            .get("/health");

        expect(

          response.status

        ).toBe(200);

      }

    );

  }

);
