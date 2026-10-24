# TWAS Madagascar Chapter

Site vitrine en React/Vite et API Django minimale pour recevoir et consulter les présentations de recherche.

## Lancer le site en local

```powershell
npm install
npm run dev
```

Pour recevoir les formulaires localement, lancer aussi l’API dans un second terminal PowerShell :

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
$env:DJANGO_DEBUG = "true"
py manage.py migrate
py manage.py createsuperuser
py manage.py runserver
```

Vite relaie les appels `/api/` vers Django sur `http://127.0.0.1:8000`. Les présentations sont enregistrées dans SQLite et consultables dans l’administration à `http://127.0.0.1:8000/admin/`.

## Déploiement envisagé

### Site React sur Vercel

- Importer le dépôt dans Vercel ; le framework Vite, la commande `npm run build` et le dossier de sortie `dist` sont configurés par défaut.
- Renseigner `VITE_API_URL` comme URL complète de l’API, par exemple `https://<compte>.pythonanywhere.com/api/submissions/`.
- Redéployer le site après avoir renseigné ou modifié cette variable.
- Depuis le dossier du projet, ouvrir une session avec `npx vercel login`, lier le projet avec `npx vercel link`, puis créer une URL de prévisualisation avec `npx vercel`.

### API Django sur PythonAnywhere

- Installer les paquets de `requirements.txt` dans l’environnement virtuel du site et renseigner cet environnement virtuel dans l’onglet **Web** de PythonAnywhere.
- Définir `DJANGO_SECRET_KEY` avec une valeur secrète, `DJANGO_DEBUG=false`, `DJANGO_ALLOWED_HOSTS=<compte>.pythonanywhere.com` et `CORS_ALLOWED_ORIGINS` avec l’origine exacte du site Vercel (par exemple `https://<projet>.vercel.app`). Plusieurs origines peuvent être séparées par des virgules.
- Dans le fichier WSGI de l’onglet **Web**, ajouter le chemin absolu du projet à `sys.path`, puis charger l’application avec `from twas_api.wsgi import application`.
- Exécuter `python manage.py migrate`, `python manage.py createsuperuser` et `python manage.py collectstatic` dans l’environnement virtuel. Mapper `/static/` vers le dossier `staticfiles` du projet dans l’onglet **Web**.
- Conserver le fichier SQLite et ses sauvegardes dans un emplacement persistant.
- Consulter et gérer les présentations via `https://<compte>.pythonanywhere.com/admin/`.

Le formulaire ne confirme une réception que si l’API a effectivement répondu avec succès. Les données collectées sont le nom, l’adresse e-mail, l’institution, le domaine, le titre, le résumé et les mots-clés facultatifs.
