import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// GET /api/apprenants
router.get("/", async (_req, res) => {
  const data = await prisma.apprenant.findMany({ orderBy: { id: "desc" } });
  res.json(data);
});

// GET /api/apprenants/:id
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = await prisma.apprenant.findUnique({
    where: { id },
    include: { commandes: true }
  });
  if (!data) return res.status(404).json({ error: "Apprenant introuvable" });
  res.json(data);
});

// POST /api/apprenants
router.post("/", async (req, res) => {
  const { email, nom, prenom } = req.body ?? {};
  if (typeof email !== "string" || typeof nom !== "string" || typeof prenom !== "string") {
    return res.status(400).json({ error: "email, nom, prenom requis (string)" });
  }

  const created = await prisma.apprenant.create({
    data: { email, nom, prenom }
  });

  res.status(201).json(created);
});

// PATCH /api/apprenants/:id
router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { email, nom, prenom } = req.body ?? {};

  const updated = await prisma.apprenant.update({
    where: { id },
    data: {
      ...(typeof email === "string" ? { email } : {}),
      ...(typeof nom === "string" ? { nom } : {}),
      ...(typeof prenom === "string" ? { prenom } : {})
    }
  });

  res.json(updated);
});

// DELETE /api/apprenants/:id
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.apprenant.delete({ where: { id } });
  res.status(204).send();
});

export default router;