import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// GET /api/formations
router.get("/", async (_req, res) => {
  const data = await prisma.formation.findMany({ orderBy: { id: "desc" } });
  res.json(data);
});

// GET /api/formations/:id
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = await prisma.formation.findUnique({
    where: { id },
    include: { lignes: true }
  });
  if (!data) return res.status(404).json({ error: "Formation introuvable" });
  res.json(data);
});

// POST /api/formations
router.post("/", async (req, res) => {
const { titre, prix, formateur } = req.body;

if (
  typeof titre !== "string" ||
  typeof formateur !== "string" ||
  (typeof prix !== "string" && typeof prix !== "number")
) {
  return res.status(400).json({ error: "titre, formateur, prix requis" });
}

const created = await prisma.formation.create({
  data: {
    titre,
    formateur,
    prix: String(prix)
  }
});

  res.status(201).json(created);
});

// PATCH /api/formations/:id
router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { titre, prix } = req.body ?? {};

  const updated = await prisma.formation.update({
    where: { id },
    data: {
      ...(typeof titre === "string" ? { titre } : {}),
      ...(typeof prix === "string" || typeof prix === "number" ? { prix: String(prix) } : {})
    }
  });

  res.json(updated);
});

// DELETE /api/formations/:id
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.formation.delete({ where: { id } });
  res.status(204).send();
});

export default router;