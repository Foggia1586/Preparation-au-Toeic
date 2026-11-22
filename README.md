# TOEIC Prep — révision TOEIC Listening & Reading

Application web de révision du TOEIC (objectifs CECRL d’ETS, entraînement par partie, examens blancs, dictées, rattrapage des erreurs et **IA Coach**). Elle s’installe sur l’écran d’accueil d’un iPhone et **fonctionne hors connexion** : questions, voix et polices sont enregistrées sur l’appareil.

## Publier le site avec GitHub Pages (gratuit)

1. Sur github.com, crée un dépôt **public** (par exemple `toeic-prep`), sans fichier README.
2. Sur la page du dépôt, choisis **Add file › Upload files**, puis glisse **le contenu** du dossier (tous les fichiers et les dossiers `audio`, `fonts`, `icons`, mais pas le dossier lui-même). **Attends que tous les fichiers aient fini de se charger** (les fichiers de voix sont les plus longs), puis valide avec **Commit changes**.
   Vérifie ensuite que le dossier `audio` du dépôt contient bien 6 fichiers : `voix-dictees.mp3`, `voix-narrateur.mp3`, `voix-p1.mp3`, `voix-p2.mp3`, `voix-p3.mp3`, `voix-p4.mp3`.
3. Va dans **Settings › Pages**. Sous *Build and deployment*, choisis **Deploy from a branch**, branche **main**, dossier **/(root)**, puis **Save**.
4. Après une à deux minutes, le site est en ligne à l’adresse `https://<ton-identifiant>.github.io/toeic-prep/`.

## Installer l’application sur iPhone

1. Ouvre l’adresse du site dans **Safari**.
2. Touche le bouton **Partager** (carré avec une flèche), puis **Sur l’écran d’accueil**, puis **Ajouter**.
3. Ouvre l’application depuis son icône **une première fois avec une connexion internet** : elle enregistre les questions et les voix (environ 11 Mo). Le message « Prête hors connexion » s’affiche dans Objectifs › Données quand c’est terminé.
4. Ensuite, elle fonctionne sans réseau.

## Installer l’application sur Android

1. Ouvre l’adresse du site dans **Chrome**.
2. Touche le menu **⋮**, puis **Installer l’application** (ou **Ajouter à l’écran d’accueil › Installer**).
3. Ouvre l’application une première fois avec une connexion internet, comme sur iPhone.

La progression est enregistrée sur l’appareil, dans l’application installée. Elle n’est pas partagée avec le navigateur ni avec un autre appareil : pour la transférer, utilise une sauvegarde.

## Sauvegarder et restaurer la progression

Dans **Objectifs › Données**, touche **⤓ Sauvegarder ma progression** :

- sur ordinateur, le fichier `toeic-prep-sauvegarde-<date>.json` est téléchargé directement ;
- sur iPhone, la feuille de partage s’ouvre : choisis **Enregistrer dans Fichiers** ;
- sur Android, une fenêtre s’ouvre : **Télécharger** enregistre le fichier dans le dossier **Téléchargements** ; **Partager…** l’envoie vers Google Drive, Gmail, etc. (au format `.txt`, le seul que Chrome accepte de partager pour ce fichier).

Pour récupérer la progression, touche **⤒ Restaurer une sauvegarde** et choisis le fichier (`.json` ou `.txt`). Pour chaque profil, la progression la plus récente est gardée.

## Mettre à jour

1. Décompresse le nouveau zip, puis, sur la page du dépôt, choisis **Add file › Upload files** et glisse tout le contenu du dossier, comme la première fois. Les fichiers du même nom sont remplacés : il n’y a rien à supprimer.
2. Clique sur **Commit changes**, puis attends une à deux minutes.
3. Ouvre l’application avec une connexion : elle télécharge en arrière-plan uniquement ce qui a changé, puis affiche « Nouvelle version disponible ». Touche **Mettre à jour**. Si tu ignores le bandeau, la nouvelle version s’installe d’elle-même la prochaine fois que l’application est complètement fermée puis rouverte.
4. Pour vérifier, va dans **Objectifs › Données** : le numéro de version y est affiché, avec un bouton **Vérifier les mises à jour**.

La progression est conservée. Avant de supprimer l’icône, fais toujours une sauvegarde : sur iPhone, supprimer l’application efface sa progression.

### Icône de l’écran d’accueil

- **Android** : Chrome change l’icône tout seul. Il vérifie l’application quand elle s’ouvre, puis applique la nouvelle icône une fois l’application fermée, le téléphone en charge et en Wi-Fi (en général sous un ou deux jours). Si une fenêtre annonce que l’icône a changé, touche **OK**, pas *Désinstaller*. Pour forcer la mise à jour : téléphone branché et en Wi-Fi, ferme l’application, ouvre `about://webapks` dans Chrome, touche **Update** sous TOEIC Prep, puis ouvre et referme l’application. L’icône change en quelques minutes.
- **iPhone** : iOS garde l’icône de l’installation et ne la change jamais, quelle que soit la mise à jour (limite d’Apple pour les applications web). Le contenu, lui, se met bien à jour. Pour avoir une nouvelle icône : sauvegarde ta progression, supprime l’icône, réinstalle depuis Safari, puis restaure la sauvegarde.

## Si les voix ne marchent pas

Dans **Objectifs › Données**, l’application indique les fichiers de voix qu’elle n’a pas pu télécharger. « Erreur 404 » signifie que le fichier manque sur GitHub : ouvre le dossier `audio` du dépôt, envoie à nouveau le fichier manquant (**Add file › Upload files**), attends une minute, puis touche **Réessayer**. En attendant, l’application lit les textes avec la voix de l’appareil.

## Contenu

- 251 questions originales au format des 7 parties officielles (ce ne sont pas des questions ETS), 60 dictées sur 3 niveaux.
- Voix neuronales générées avec le modèle libre Kokoro-82M (licence Apache 2.0), accents américain et britannique.
- IA Coach : moteur intégré qui analyse les erreurs (compétences, pièges de la Part 2, types de fautes en dictée) et crée des récaps audio, texte et dictée, sans connexion et sans service externe.
- Police Jost (SIL Open Font License 1.1, voir `fonts/OFL.txt`). Sur iPhone, l’application utilise la police Futura du système.
