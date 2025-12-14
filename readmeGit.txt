Dans le dossier racine du projet (crm-formation-back) :
git init

Vérifier / créer le .gitignore
node_modules
dist
.env

Ajouter tous les fichiers
git add .

pour verifier : git status

Premier commit
git commit -m "Initial backend CRM Formation (Node, Express, Prisma)"

git branch -M main

Créer le repo distant (GitHub)
Sur GitHub :
	•	New repository
	•	Nom : crm-formation-back
	•	Ne coche rien (pas de README, pas de .gitignore)

Copie l’URL du repo, par ex. :
git@github.com:fredGooM/crm-formation-back.git

Lier le repo local au distant
git remote add origin git@github.com:fredGooM/crm-formation-back.git
ATTENTION : connction en SSL : pas brouillon
La bonne cmd :
--> git remote add origin https://git@github.com:fredGooM/crm-formation-back.git

Verif: git remote -v

Pousser le code
git branch -M main
git push -u origin main

erreur :
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.
Correctif si crée en SSL :
--> git remote set-url origin https://github.com/<TON_USER>/<TON_REPO>.git
ex -> git remote set-url origin https://github.com/fredGooM/crm-formation-back.git
git push -u origin main

Résultat attendu
	•	Le repo GitHub contient ton code
	•	Les dossiers ignorés (node_modules, .env) ne sont pas poussés
	•	Les futurs git push se feront avec :