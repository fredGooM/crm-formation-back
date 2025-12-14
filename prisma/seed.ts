import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Apprenants
  const apprenant = await prisma.apprenant.create({
    data: {
      email: "demo@test.fr",
      nom: "Demo",
      prenom: "User"
    }
  });

  // Formations
  const formation = await prisma.formation.create({
    data: {
      titre: "Formation TypeScript2",
      prix: "1000"
    }
  });

  // Commande
  const commande = await prisma.commande.create({
    data: {
      apprenantId: apprenant.id,
      etat: "en cours",
      lignes: {
        create: {
          formationId: formation.id,
          quantite: 1
        }
      }
    }
  });

  console.log("✅ Seed terminé");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })