import buildApp from "./app.js";

async function start() {

  const app =
    await buildApp();

  const PORT =

    Number(
      process.env.PORT
    ) || 3000;

  const HOST =

    process.env.HOST ||

    "0.0.0.0";

  try {

    console.log(app.printRoutes());

    await app.listen({

      port: PORT,

      host: HOST

    });

    app.log.info(

      `SmartPOS API running on ${HOST}:${PORT}`

    );

  } catch (error) {

    app.log.error(error);

    process.exit(1);

  }

}

start();
