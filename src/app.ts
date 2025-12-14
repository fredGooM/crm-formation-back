import express from "express";
import routes from "./routes";

export const app = express();

app.use(express.json());

// healthcheck
app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api", routes);

// erreurs simples
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Erreur interne" });
});