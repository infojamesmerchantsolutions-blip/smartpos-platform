import fp from "fastify-plugin";

import fastifySwagger from "@fastify/swagger";

import fastifySwaggerUI from "@fastify/swagger-ui";

export default fp(async (app) => {

  await app.register(

    fastifySwagger,

    {

      openapi: {

        info: {

          title: "SmartPOS Platform API",

          description:
            "Enterprise Payment Infrastructure",

          version: "1.0.0"

        },

        servers: [

          {

            url: "/"

          }

        ],

        components: {

          securitySchemes: {

            bearerAuth: {

              type: "http",

              scheme: "bearer",

              bearerFormat: "JWT"

            }

          }

        }

      }

    }

  );

  await app.register(

    fastifySwaggerUI,

    {

      routePrefix:
        "/docs",

      uiConfig: {

        docExpansion:
          "list",

        deepLinking:
          false

      }

    }

  );

});
