# CRM Formation – Backend

Backend d’un mini **CRM Formation** développé en **Node.js / Express**, **TypeScript** et **Prisma**.

Le projet gère :
- des **Apprenants**
- des **Formations**
- des **Commandes**
- le lien **Commande ↔ Formation** (N-N)

---

## 🧱 Stack technique

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- tsx (dev)
- REST API JSON

---

## 📁 Structure du projet
crm-formation-back/
├─ prisma/
│  └─ schema.prisma
├─ src/
│  ├─ app.ts
│  ├─ server.ts
│  ├─ prisma.ts
│  └─ routes/
│     ├─ index.ts
│     ├─ apprenants.routes.ts
│     ├─ formations.routes.ts
│     └─ commandes.routes.ts
├─ .env.example
├─ package.json
├─ tsconfig.json
└─ README.md