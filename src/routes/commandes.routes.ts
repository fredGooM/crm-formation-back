import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

/**
 * GET /api/commandes
 * Retourne commandes avec apprenant + lignes + formation
 */
router.get("/", async (_req, res) => {
  const data = await prisma.commande.findMany({
    orderBy: { id: "desc" },
    include: {
      apprenant: true,
      lignes: { include: { formation: true } }
    }
  });
  res.json(data);
});

/**
 * GET /api/commandes/:id
 */
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = await prisma.commande.findUnique({
    where: { id },
    include: {
      apprenant: true,
      lignes: { include: { formation: true } }
    }
  });
  if (!data) return res.status(404).json({ error: "Commande introuvable" });
  res.json(data);
});

/**
 * POST /api/commandes
 * body:
 * {
 *   apprenantId: number,
 *   etat: string,
 *   lignes?: [{ formationId: number, quantite: number }]
 * }
 */
router.post("/", async (req, res) => {
  const { apprenantId, etat, lignes } = req.body ?? {};

  if (typeof apprenantId !== "number" || typeof etat !== "string") {
    return res.status(400).json({ error: "apprenantId (number) et etat (string) requis" });
  }

  const created = await prisma.commande.create({
    data: {
      apprenantId,
      etat,
      ...(Array.isArray(lignes) && lignes.length > 0
        ? {
            lignes: {
              create: lignes.map((l: any) => ({
                formationId: Number(l.formationId),
                quantite: Number(l.quantite)
              }))
            }
          }
        : {})
    },
    include: {
      apprenant: true,
      lignes: { include: { formation: true } }
    }
  });

  res.status(201).json(created);
});

/**
 * PATCH /api/commandes/:id
 * Permet de modifier l'etat (et éventuellement apprenantId).
 */
router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { etat, apprenantId } = req.body ?? {};

  const updated = await prisma.commande.update({
    where: { id },
    data: {
      ...(typeof etat === "string" ? { etat } : {}),
      ...(typeof apprenantId === "number" ? { apprenantId } : {})
    },
    include: {
      apprenant: true,
      lignes: { include: { formation: true } }
    }
  });

  res.json(updated);
});

/**
 * POST /api/commandes/:id/lignes
 * Ajoute ou met à jour une ligne (formationId, quantite)
 * body: { formationId: number, quantite: number }
 */
router.post("/:id/lignes", async (req, res) => {
  const commandeId = Number(req.params.id);
  const { formationId, quantite } = req.body ?? {};

  if (typeof formationId !== "number" || typeof quantite !== "number") {
    return res.status(400).json({ error: "formationId (number) et quantite (number) requis" });
  }

  const line = await prisma.commandeEnFormation.upsert({
    where: {
      commandeId_formationId: { commandeId, formationId }
    },
    update: { quantite },
    create: { commandeId, formationId, quantite }
  });

  res.status(201).json(line);
});

/**
 * DELETE /api/commandes/:id/lignes/:formationId
 */
router.delete("/:id/lignes/:formationId", async (req, res) => {
  const commandeId = Number(req.params.id);
  const formationId = Number(req.params.formationId);

  await prisma.commandeEnFormation.delete({
    where: { commandeId_formationId: { commandeId, formationId } }
  });

  res.status(204).send();
});

// DELETE /api/commandes/:id
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.commande.delete({ where: { id } });
  res.status(204).send();
});

export default router;