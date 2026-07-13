import os from "os";

export default class SystemService {

  info() {

    return {

      platform:

        os.platform(),

      architecture:

        os.arch(),

      hostname:

        os.hostname(),

      cpus:

        os.cpus().length,

      totalMemory:

        os.totalmem(),

      freeMemory:

        os.freemem(),

      uptime:

        os.uptime(),

      loadAverage:

        os.loadavg(),

      nodeVersion:

        process.version,

      pid:

        process.pid,

      environment:

        process.env.NODE_ENV

    };

  }

}
