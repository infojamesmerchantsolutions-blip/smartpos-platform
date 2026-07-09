```typescript
import dotenv from "dotenv";
dotenv.config();

import { buildApp } from "./app";

const app = buildApp();

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;

    await app.listen({
      host: "0.0.0.0",
      port
    });

    app.log.info(`🚀 SmartPOS API running on http://localhost:${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
```
